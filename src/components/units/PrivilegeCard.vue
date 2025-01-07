<template>
  <div class="wrapper mb-4" :class="{ 'is-highlight': isHighlight }">
    <div class="flex-row">
      <div class="img-wrapper">
        <img
          :src="previewImage"
          alt="privilege image"
          class="privilege-img"
        />
        <div
          v-if="isHighlight"
          class="recommended"
        >
          Recommended
        </div>
      </div>
      <div class="detail">
        <p class="name">{{ privilege.Privilege_Title }}</p>
        <p v-html="termAndCondition" class="is-size-7" />
      </div>
      <div v-if="privilege.isUsed" class="mark-use used">
        <span class="has-text-weight-bold is-uppercase">used</span>
        <span>at {{ usedStoreCode }}</span>
        <span>By {{ privilege?.voucher?.Marked_Used_By }}</span>
        <span>{{ displayTime }}</span>
      </div>
      <div v-else class="mark-use" @click="openConfirm">
        Mark use
      </div>
    </div>
  </div>
  <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
    <div class="card">
      <div class="card-header">
        <p class="card-header-title is-justify-content-center">Confirm to Mark Use ?</p>
      </div>
      <div class="card-content">
        <div class="content has-text-centered is-flex is-flex-direction-column">
          <span class="has-text-weight-bold">ยืนยันการใช้ Voucher นี้ใช่หรือไม่ ?</span><br />
          <span class="mb-2">*Voucher นี้ไม่สามารถคืน หรือแลกเปลี่ยนเป็นเงินสด บัตรกำนัล หรือผลิตภัณฑ์อื่นได้</span>
          <b-field
            v-if="isBarCodeRequired"
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

<script>
import { useMemberStore } from '../../stores/member'
import { useUserStore } from '../../stores/user'
import { usePrivilegeStore } from '../../stores/privilege'

export default {
  props: {
    privilege: {
      type: Object,
      default: () => null,
    },
    isBarCodeRequired: {
      type: Boolean,
      default: false,
    },
    campaignName: {
      type: String,
      default: ''
    },
    campaignType: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      isCardModalActive: false,
      barcode: '',
      isLoading: false
    }
  },
  computed: {
    isValid() {
      if (!this.isBarCodeRequired) {
        return true
      }
      if (!this.barcode) {
        return false
      }
      return true
    },
    usedStoreCode() {
      if (this.privilege?.voucher?.Used_Store?.name) {
        return this.privilege?.voucher?.Used_Store?.name.split('-')[0]
      }
      return ''
    },
    displayTime() {
      const date = new Date(this.privilege?.voucher?.Used_Date_Time)
      const formattedDate = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })

      const formattedDateHyphen = formattedDate.replace(/\//g, '-').replace(',', '')
      return formattedDateHyphen
    },
    isHighlight() {
      const memberStore = useMemberStore()
      return this.privilege.Valid_Tiers.includes(memberStore.data.Current_Tier)
    },
    termAndCondition() {
      return this.privilege.Terms_Conditions.replace(/\n/g, '<br>')
    },
    previewImage() {
      return `${import.meta.env.VITE_IMAGE_BASE_URL}/EntityImageAttach.do?action_module=CustomModule17&entityId=${this.privilege.id}&actionName=readImage&fileId=${this.privilege.Record_Image}`
    }
  },
  methods: {
    goBack() {
      window.history.back()
    },
    openConfirm() {
      if (this.isLoading) {
        return
      }
      if (this.privilege.isUsed) {
        this.$buefy.snackbar.open({
          duration: 3000,
          message: 'Already used.',
          position: 'is-top',
          actionText: null,
          type: 'is-warning'
        })
        return
      }
      this.isCardModalActive = true
    },
    closeConfirm() {
      this.isCardModalActive = false
    },
    formatDateToISOWithTimezone(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      
      const timezone = '+07:00'

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`
      
      return formattedDate
    },
    async markUse() {
      this.closeConfirm()
      const memberStore = useMemberStore()
      const userStore = useUserStore()
      const privilegeStore = usePrivilegeStore()
      try {
        this.isLoading = true
        const storeName = userStore.data?.User_Store1 || userStore.data?.User_Store
        const responseStore = await window.ZOHO.CRM.API.searchRecord({
          Entity: 'Vendors',
          Type: 'criteria',
          Query: `Vendor_Name:equals:${storeName}`
        })
        if (Array.isArray(responseStore?.data)) {
          const store = responseStore?.data[0]
          const responseVoucher = await window.ZOHO.CRM.API.insertRecord({
            Entity: 'Voucher',
            APIData: {
              Contact_Name: memberStore.data.id,
              Privilege_Sub_Title: memberStore.data.id,
              Name: `${this.privilege.Name}`,
              Used_Date_Time: this.formatDateToISOWithTimezone(new Date()),
              Used_Store: store.id,
              Marked_Used_By: userStore.data?.full_name,
              Type_of_Privilege: 'Gift',
              Sub_Type: 'Special Gift',
              Voucher_Code: this.privilege.Voucher_Code,
              Standard_Privilege: this.privilege.id,
              Generate_From: 'Gift_Set',
              Voucher_Status: 'Used',
              Note: this.barcode
            }
          })
          if (responseVoucher?.data[0]?.code === 'SUCCESS') {
            const tempMarkUsedString = sessionStorage.getItem('latest-mark-use-member')
            const tempMarkUsedJson = tempMarkUsedString ? JSON.parse(tempMarkUsedString) : []
            sessionStorage.setItem('latest-mark-use-member', JSON.stringify([
              ...tempMarkUsedJson,
              {
                name: this.campaignName,
                Privilege_Title: this.privilege.Privilege_Title,
                Standard_Privilege: {
                  id: this.privilege.id,
                },
                memberId: memberStore.data.id,
                Used_Date_Time: this.formatDateToISOWithTimezone(new Date()),
                Marked_Used_By: userStore.data?.full_name,
                Voucher_Status: 'Used',
                Used_Store: {
                  name: store?.Store_Name,
                },
              }
            ]))
            privilegeStore.setUsedPrivilegeLocal(this.privilege.Privilege_Title, {
              Used_Date_Time: this.formatDateToISOWithTimezone(new Date()),
              Marked_Used_By: userStore.data?.full_name,
              Voucher_Status: 'Used',
              Used_Store: {
                name: store?.Store_Name,
              },
            }, this.campaignType === 'multiple')
              this.$buefy.snackbar.open({
                duration: 3000,
                message: 'Successfully mark use.',
                position: 'is-top',
                actionText: 'Go back',
                onAction: () => {
                  this.goBack()
                }
              })
          }
        }
        else {
          this.$buefy.snackbar.open({
            message: 'This user is not permitted to perform action as User is not assigned to any Store. Please contact Admin.',
            position: 'is-top',
            type: 'is-warning',
          })
        }
        this.isLoading = false
      }
      catch (err) {
        console.log(err)
        this.$buefy.snackbar.open({
          message: `Something wrong ! please capture screen or click "Copy" button and contact admin.<br/><br/>${JSON.stringify(err)}`,
          position: 'is-top',
          actionText: 'Copy',
          type: 'is-warning',
          onAction: () => {
            navigator.clipboard.writeText(JSON.stringify(err))
          }
        })
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  overflow: hidden;
  min-height: 120px;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.img-wrapper {
  height: auto;
  width: 120px;
  position: relative;
}

.privilege-img {
  width: auto;
  height: 100%;
  object-fit: cover;
}

.detail {
  padding: 0.5rem;
  flex: 1;
}
.name {
  margin-bottom: 0 !important;
  font-size: 1rem;
  font-weight: bold;
}
.mark-use {
  background-color: #00b57b;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  flex: 0;
  padding: 0.5rem;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.used {
  font-weight: normal;
  cursor: default;
  background-color: hsl(0,0%,86%);
  color: #000000;
}

.is-highlight {
  box-shadow: rgba(255, 102, 0, 0.2) 0px 0px 29px 0px;
}

.recommended {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.7);
  background-image: linear-gradient(bottom to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.1));
  text-align: center;
  font-weight: bold;
  padding: 4px 0px;
}

.cancel {
  color: #000000
}

.confirm {
  color: #00b57b; 
}
</style>
