<!-- eslint-disable prettier/prettier -->
<script setup>
</script>

<template>
  <div class="container">
    <Loading v-if="isLoading" />
    <span class="is-size-5 mb-3 is-clickable mr-auto" @click="goBack">&lt; <span class="is-underlined">Back</span></span>
    <div
      v-if="user && !isLoading"
    >
      <MembershipDetailCard
        :name="user?.Full_Name"
        :member-no="user?.JT_Membership_No"
        :tier="user?.Current_Tier"
      />
      <div class="button-wrapper" v-if="!selectedPrivilege">
        <div
          v-for="(campaign, index) in campaigns"
          :key="index"
          class="gift-btn"
          @click="selectPrivilege(campaign)"
        >
          <img :src="`./images/${campaign.value}.jpg`" :alt="campaign.value">
          <span>
            {{ campaign.name }}
          </span>
        </div>
      </div>
      <PrivilegeSection
        :privilege-name="selectedPrivilege"
        v-if="selectedPrivilege"
      />
    </div>
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
import PrivilegeSection from './components/PrivilegeSection.vue'
import Loading from './components/Loading.vue'

import { useLoadingStore } from './stores/loading'
import { useMemberStore } from './stores/member'
import { useUserStore } from './stores/user'

export default {
  components: {
    MembershipDetailCard,
    PrivilegeSection,
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
      selectedPrivilege: ''
    };
  },
  computed: {
    isLoading() {
      const loading = useLoadingStore()
      return loading.isLoading
    },
    campaigns() {
      return JSON.parse(import.meta.env.VITE_CAMPAIGNS)
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
      loading.setLoading(false)
    } catch (err) {
      console.debug(err);
      loading.setLoading(false)
    }
  },
  methods: {
    selectPrivilege(campaign) {
      this.selectedPrivilege = campaign.name
    },
    goBack() {
      if (this.selectedPrivilege) {
        this.selectedPrivilege = ''
      }
      else {
        window.history.back()
      }
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

.button-wrapper {
  display: flex;
  padding: 24px;
  gap: 24px;
  justify-content: center;
  align-items: center;
}

.gift-btn {
  background-color: #FFFFFF;
  min-height: 100px;
  min-width: 300px;
  border: 2px solid #E88625;
  border-radius: 16px;
  cursor: pointer;
  transition: all .3s ease;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gift-btn > img {
  width: 300px;
  height: 200px;
}
.gift-btn > span {
  margin: 8px;
}

.gift-btn:hover {
  background-color: #E88625;
}
</style>
