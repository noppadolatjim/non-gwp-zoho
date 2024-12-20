<!-- eslint-disable prettier/prettier -->
<script setup>
</script>

<template>
  <div class="container">
    <Loading v-if="isLoading" />
    <span class="is-size-5 mb-3 is-clickable mr-auto" @click="goBack">&lt; <span class="is-underlined">Back</span></span>
    <MembershipDetailCard
      v-if="user && !isLoading"
      :name="user?.Full_Name"
      :member-no="user?.JT_Membership_No"
      :tier="user?.Current_Tier"
    />
    <div
      class="no-member"
      v-else-if="!user && !isLoading"
    >
      No Member found
    </div>
  </div>
</template>
<script>
import MembershipDetailCard from './components/MembershipDetailCard.vue'
import Loading from './components/Loading.vue'

import { useLoadingStore } from './stores/loading'
import { useMemberStore } from './stores/member'
import { useUserStore } from './stores/user'
import { usePrivilegeStore } from './stores/privilege'

export default {
  components: {
    MembershipDetailCard,
    Loading,
  },
  props: {
    id: String,
  },
  data() {
    return {
      count: 0,
      user: null,
      privileges: [],
      voucher: [],
      isSomeUsed: false,
    };
  },
  computed: {
    isLoading() {
      const loading = useLoadingStore()
      return loading.isLoading
    },
  },
  async mounted() {
    const loading = useLoadingStore()
    const memberStore = useMemberStore()
    const userStore = useUserStore()
    try {
      loading.setLoading(true)
      const responseUser = await window.ZOHO.CRM.CONFIG.getCurrentUser()
      if (responseUser?.users[0]) {
        const user = await window.ZOHO.CRM.API.getUser({ ID: responseUser?.users[0].id })
        userStore.setData(user?.users[0])
      }
      const userResponse = await window.ZOHO.CRM.API.searchRecord({
        Entity:'Contacts',
        Type:'criteria',
        Query:`Id:equals:${this.$props.id}`,
      })
      if (userResponse?.data) {
        this.user = userResponse.data[0]
        memberStore.setData(userResponse.data[0])
      }
      await this.fetchData()
      loading.setLoading(false)
    } catch (err) {
      console.debug(err);
      loading.setLoading(false)
    }
  },
  methods: {
    goBack() {
      window.history.back()
    },
    async fetchData() {
      const privilegeStore = usePrivilegeStore()
      const today = new Date()
      const privileges = await window.ZOHO.CRM.API.searchRecord({
        Entity: 'Standard_Privilege',
        Type: 'criteria',
        Query: '((Privilege_Title:starts_with:Gift Set)and(Status:equals:Inactive))',
      })
      if (privileges?.data) {
        const voucher = await this.getInvolveVoucher()
        const usedPrivilegeId = voucher?.Standard_Privilege?.id
        const privilegeMaps = privileges?.data
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
                voucher: voucher
              }
            }
            return {
              ...p,
              isUsed: false,
            }
          })
        const isSomeUsed = privilegeMaps.some(p => p.isUsed)
        if (isSomeUsed) {
          this.isSomeUsed = isSomeUsed
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
    },
    async getInvolveVoucher() {
      const memberStore = useMemberStore()
      const responseVoucher = await window.ZOHO.CRM.API.searchRecord({
        Entity: 'Voucher',
        Type: 'criteria',
        Query: `((Name:starts_with:Gift Set)and(Contact_Name:equals:${memberStore.data.id})and(Voucher_Status:equals:Used))`
      })
      
      if (Array.isArray(responseVoucher?.data)) {
        return responseVoucher?.data[0]
      }

      return null
    },
  }
};
</script>

<style scoped>
.no-member {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
}
</style>
