<template>
  <div class="wrapper">
    <div class="flex-row">
      <div class="img-wrapper">
        <img
          :src="privilege.Record_Image_Link"
          alt="privilege image"
          class="privilege-img"
        />
      </div>
      <div class="detail">
        <p class="name">{{ privilege.Name }}</p>
        <p>{{ privilege.Description }}</p>
      </div>
      <div :class="!isUsed ? 'mark-use' : 'mark-use used'" @click="markUse">
        Mark use
      </div>
    </div>
  </div>
</template>

<script>
import { useLoadingStore } from '../../stores/loading'
import { useMemberStore } from '../../stores/member'
import { useUserStore } from '../../stores/user'

export default {
  props: {
    privilege: {
      type: Object,
      default: () => null,
    }
  },
  data() {
    return {
      isUsed: false,
    }
  },
  async mounted() {
    await this.checkVoucherStatus()
  },
  methods: {
    goBack() {
      window.history.back()
    },
    async checkVoucherStatus() {
      const memberStore = useMemberStore()
      const responseVoucher = await window.ZOHO.CRM.API.searchRecord({
        Entity: 'Voucher',
        Type: 'criteria',
        Query: `((Standard_Privilege:equals:${this.privilege.id})and(Contact_Name:equals:${memberStore.data.id}))`
      })
      if (responseVoucher?.data[0]?.Voucher_Status === 'Used') {
        this.isUsed = true
      }
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
      if (this.isUsed) {
        this.$buefy.snackbar.open({
          duration: 3000,
          message: 'Already used.',
          position: 'is-top',
          actionText: null,
          type: 'is-warning'
        })
        return
      }
      const loading = useLoadingStore()
      const memberStore = useMemberStore()
      const userStore = useUserStore()
      try {
        loading.setLoading(true)
        const responseStore = await window.ZOHO.CRM.API.searchRecord({
          Entity: 'Vendors',
          Type: 'criteria',
          Query: `Store_User:equals:${userStore.data?.full_name}`
        })
        if (responseStore?.data) {
          const store = responseStore?.data[0]
          const responseVoucher = await window.ZOHO.CRM.API.insertRecord({
            Entity: 'Voucher',
            APIData: {
              Contact_Name: memberStore.data.id,
              Name: this.privilege.Name,
              Used_Date_Time: this.formatDateToISOWithTimezone(new Date()),
              Used_Store: store.id,
              Marked_Used_By: userStore.data?.full_name,
              Voucher_Status: 'Used',
              Standard_Privilege: this.privilege.id
            }
          })
          if (responseVoucher?.data[0]?.code === 'SUCCESS') {
              this.isUsed = true
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
        loading.setLoading(false)
      }
      catch (err) {
        this.$buefy.snackbar.open({
          message: `Something wrong ! please capture screen or click "Copy" button and contact admin.<br/><br/>${JSON.stringify(err)}`,
          position: 'is-top',
          actionText: 'Copy',
          type: 'is-warning',
          onAction: () => {
            navigator.clipboard.writeText(JSON.stringify(err))
          }
        })
        loading.setLoading(false)
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  overflow: hidden;
  height: 120px;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.img-wrapper {
  height: 120px;
  width: 120px;
}

.privilege-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail {
  padding: 0.5rem;
  flex: 1;
}
.name {
  margin-bottom: 0 !important;
  font-size: 1.25rem;
}
.mark-use {
  background-color: #ff7a2d;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  flex: 0;
  padding: 0.5rem;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 2px dashed #ff7220;
}

.used {
  cursor: not-allowed;
  border-left: 2px dashed #000000;
  background-color: #aaaaaa;
}
</style>
