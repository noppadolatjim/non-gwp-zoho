<template>
  <div class="card mt-2">
    <div class="column pa-1">
      <p>Privileges <span class="warning is-size-7">(Voucher นี้ไม่สามารถคืน หรือแลกเปลี่ยนเป็นเงินสด บัตรกำนัล หรือผลิตภัณฑ์อื่นได้)</span></p>
      <div
        v-if="privileges.length > 0"
        class="column card-container"
      >
        <PrivilegeCard
          v-for="(privilege, index) in privileges"
          :key="index"
          :privilege="privilege"
          :campaignType="campaign.type"
          :isBarCodeRequired="campaign.isBarCodeRequired"
          :campaignName="campaign.name"
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
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import { useMemberStore } from '../stores/member'
import { usePrivilegeStore } from '../stores/privilege'

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

const isLoading = ref(false)

const campaigns = computed(() => {
  return JSON.parse(import.meta.env.VITE_CAMPAIGNS)
})

const campaign = computed(() => {
  return campaigns.value.find(campaign => campaign.name === props.privilegeName)
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
    return tempMarkUsedJson.filter(item => item.memberId === memberStore.data.id && item.name.startsWith(campaign.value.query))
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

</script>

<style scoped>

</style>
