<template>
  <div class="card mt-2">
    <div class="column pa-1 is-flex is-flex-direction-column">
      <p>Privileges <span class="warning is-size-7">(Voucher นี้ไม่สามารถคืน หรือแลกเปลี่ยนเป็นเงินสด บัตรกำนัล หรือผลิตภัณฑ์อื่นได้)</span></p>
      <b-button
        type="is-success"
        v-if="campaign.type === 'multiple' && unUsedItems.length > 0"
        @click="openConfirm(privileges)"
        class="ml-auto mr-3"
      >
        Mark All
      </b-button>
      <div
        v-if="privileges.length > 0"
        class="column card-container"
      >
        <PrivilegeCard
          v-for="(privilege, index) in privileges"
          :key="index"
          :privilege="privilege"
          :campaignType="campaign.type"
          :campaignName="campaign.name"
          @openConfirm="openConfirm"
          @markUse="markUse"
          @closeConfirm="closeConfirm"
        />
      </div>
      <div
        class="no-privileges"
        v-else-if="privileges.length === 0 && !isLoading"
      >
        <p>No available privilege.</p>
      </div>
      <div
        class="no-privileges"
        v-else
      >
        <p>Loading...</p>
      </div>
    </div>
  </div>
  <b-modal v-model="selectedPrivileges" :width="640" scroll="keep">
    <div class="card">
      <div class="card-header">
        <p class="card-header-title is-justify-content-center">Confirm to Mark Use ?</p>
      </div>
      <div class="card-content">
        <div class="content has-text-centered is-flex is-flex-direction-column">
          <span class="has-text-weight-bold">ยืนยันการใช้ Voucher นี้ใช่หรือไม่ ?</span><br />
          <span class="mb-2">*Voucher นี้ไม่สามารถคืน หรือแลกเปลี่ยนเป็นเงินสด บัตรกำนัล หรือผลิตภัณฑ์อื่นได้</span>
          <b-field
            v-if="campaign.type === 'multiple'"
            label="Barcode"
            horizontal
          >
            <b-input v-model="barcode"></b-input>
          </b-field>
        </div>
      </div>
      <footer class="modal-card-foot">
        <b-button @click="closeConfirm">Cancel</b-button>
        <b-button @click="markUse" type="is-primary" :disabled="!isValid" :loading="isLoading">Confirm</b-button>
      </footer>
    </div>
  </b-modal>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
// import { SnackbarProgrammatic } from 'buefy'

import { useMemberStore } from '../stores/member'
import { usePrivilegeStore } from '../stores/privilege'
import { useUserStore } from '../stores/user'

import PrivilegeCard from './units/PrivilegeCard.vue'

const props = defineProps({
  privilegeName: {
    type: String,
    default: '',
  },
  isRequiredBarcode: {
    type: String,
    default: '',
  }
})

const privilegeStore = usePrivilegeStore()

const privileges = computed(() => privilegeStore.data)

const unUsedItems = computed(() => privileges.value.filter(item => !item.isUsed))

const isLoading = ref(false)

const selectedPrivileges = ref(null)

const barcode = ref('')

const campaigns = computed(() => {
  return JSON.parse(import.meta.env.VITE_CAMPAIGNS)
})

const campaign = computed(() => {
  return campaigns.value.find(campaign => campaign.name === props.privilegeName)
})

const isValid = computed(() => {
  if (campaign.value.type !== 'multiple') {
    return true
  }
  if (!barcode.value) {
    return false
  }
  return true
})

onMounted(async () => {
  privilegeStore.setData([])
  isLoading.value = true
  const today = new Date()
  const privilegeResponse = await window.ZOHO.CRM.API.searchRecord({
    Entity: 'Standard_Privilege',
    Type: 'criteria',
    Query: `((Privilege_Title:starts_with:${campaign.value.query})and(Status:equals:Inactive))`,
  })
  if (privilegeResponse.data) {
    if (campaign.value.type === 'single') {
      const voucher = await getInvolveVoucher()
      const usedPrivilegeId = voucher ? voucher[0]?.Standard_Privilege?.id : null
      const privilegeMaps = privilegeResponse?.data
        .filter(privilege => {
          const startDate = new Date(privilege.Start_Date)
          const endDate = new Date(privilege.End_Date).setHours(23, 59, 59, 999)
          return startDate <= today && today <= endDate
        })
        .map(p => {
          if (usedPrivilegeId === p.id) {
            return {
              ...p,
              isUsed: true,
              voucher: voucher[0]
            }
          }
          return {
            ...p,
            isUsed: false,
          }
        })
      const isSomeUsed = privilegeMaps.some(p => p.isUsed)
      if (isSomeUsed) {
        privilegeStore.setData(privilegeMaps.map(p => {
          if (p.isUsed) {
            return {
              ...p,
              isHidden: false,
            }
          }
          return {
              ...p,
              isHidden: true,
            }
        }).filter(p => !p.isHidden))
      }
      else {
        privilegeStore.setData(privilegeMaps)
      }
    }
    else if (campaign.value.type === 'multiple') {
      const vouchers = await getInvolveVoucher()
      const usedPrivilegeIds = vouchers ? vouchers?.map(s => s?.Standard_Privilege?.id) : []
      const privilege = privilegeResponse?.data[0]
      if (privilege) {
        const privileges = [...Array(Number(privilege.Valid_Duration)).keys()].map(i => {
          if (usedPrivilegeIds[i]) {
            return {
              ...privilege,
              Privilege_Title: `${privilege.Privilege_Title} - ${i + 1}`,
              isUsed: true,
              voucher: vouchers[i]
            }
          }
          return {
            ...privilege,
            Privilege_Title: `${privilege.Privilege_Title} - ${i + 1}`,
          }
        })
        .filter(privilege => {
          const startDate = new Date(privilege.Start_Date)
          const endDate = new Date(privilege.End_Date).setHours(23, 59, 59, 999)
          return startDate <= today && today <= endDate
        })
      privilegeStore.setData(privileges)
      }
    }
  }
  isLoading.value = false
})

const getInvolveVoucher = async () => {
  const memberStore = useMemberStore()
  const tempMarkUsedString = sessionStorage.getItem('latest-mark-use-member')
  if (tempMarkUsedString) {
    const tempMarkUsedJson = JSON.parse(tempMarkUsedString)
    return tempMarkUsedJson.filter(item => item.memberId === memberStore.data.id && item.Privilege_Title.startsWith(campaign.value.query))
  }
  const responseVoucher = await window.ZOHO.CRM.API.searchRecord({
    Entity: 'Voucher',
    Type: 'criteria',
    Query: `((Name:starts_with:${campaign.value.query})and(Contact_Name:equals:${memberStore.data.id})and(Voucher_Status:equals:Used))`
  })
  
  if (Array.isArray(responseVoucher?.data)) {
    return responseVoucher?.data
  }

  return null
}

const markUse = async () => {
  const memberStore = useMemberStore()
  const userStore = useUserStore()
  const privilegeStore = usePrivilegeStore()
  try {
    isLoading.value = true
    const storeName = userStore.data?.User_Store1 || userStore.data?.User_Store
    const responseStore = await window.ZOHO.CRM.API.searchRecord({
      Entity: 'Vendors',
      Type: 'criteria',
      Query: `Vendor_Name:equals:${storeName}`
    })
    const store = responseStore?.data[0]
    if (Array.isArray(responseStore?.data)) {
      for (const selectedPrivilege of selectedPrivileges.value) {
        const responseVoucher = await window.ZOHO.CRM.API.insertRecord({
          Entity: 'Voucher',
          APIData: {
            Contact_Name: memberStore.data.id,
            Privilege_Sub_Title: memberStore.data.id,
            Name: `${selectedPrivilege.Name}`,
            Used_Date_Time: formatDateToISOWithTimezone(new Date()),
            Used_Store: store.id,
            Marked_Used_By: userStore.data?.full_name,
            Type_of_Privilege: 'Gift',
            Sub_Type: 'Special Gift',
            Voucher_Code: selectedPrivilege.Voucher_Code,
            Standard_Privilege: selectedPrivilege.id,
            Generate_From: campaign.value.value,
            Voucher_Status: '',
            Note: barcode.value
          }
        })
        if (responseVoucher?.data[0]?.code === 'SUCCESS') {
          const tempMarkUsedString = sessionStorage.getItem('latest-mark-use-member')
          const tempMarkUsedJson = tempMarkUsedString ? JSON.parse(tempMarkUsedString) : []
          sessionStorage.setItem('latest-mark-use-member', JSON.stringify([
            ...tempMarkUsedJson,
            {
              name: campaign.value.name,
              Privilege_Title: selectedPrivilege.Privilege_Title,
              Standard_Privilege: {
                id: selectedPrivilege.id,
              },
              memberId: memberStore.data.id,
              Used_Date_Time: formatDateToISOWithTimezone(new Date()),
              Marked_Used_By: userStore.data?.full_name,
              Voucher_Status: 'Used',
              Used_Store: {
                name: store?.Store_Name,
              },
            }
          ]))
          privilegeStore.setUsedPrivilegeLocal(selectedPrivilege.Privilege_Title, {
            Used_Date_Time: formatDateToISOWithTimezone(new Date()),
            Marked_Used_By: userStore.data?.full_name,
            Voucher_Status: 'Used',
            Used_Store: {
              name: store?.Store_Name,
            },
          }, campaign.value.type === 'multiple')
        }
      }
      isLoading.value = false
      barcode.value = ''
    }
    else {
      isLoading.value = false
      barcode.value = ''
    }
    isLoading.value = false
    closeConfirm()
  }
  catch (err) {
    console.log(err)
    isLoading.value = false
  }
}

const openConfirm = (items) => {
  if (isLoading.value) {
    return
  }
  const unUsedItems = items.filter(item => !item.isUsed)
  if (unUsedItems.length === 0) {
    return
  }
  selectedPrivileges.value = items
}

const closeConfirm = () => {
  selectedPrivileges.value = null
}

const formatDateToISOWithTimezone = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  
  const timezone = '+07:00'

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`
  
  return formattedDate
}

const goBack = () => {
  window.history.back()
}

</script>

<style scoped>

</style>
