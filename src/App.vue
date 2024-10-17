<!-- eslint-disable prettier/prettier -->
<script setup>
</script>

<template>
  <div class="container">
    <Loading v-if="isLoading" />
    <span class="is-size-5 mb-3 is-clickable" @click="goBack">&lt; <span class="is-underlined">Back</span></span>
    <MembershipDetailCard
      v-if="user && !loading"
      :name="user?.Full_Name"
      :member-no="user?.JT_Membership_No"
      :privileges="privileges"
      :tier="user?.Current_Tier"
    />
    <div
      class="no-member"
      v-else-if="!user && !loading"
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
      const userResponse = await window.ZOHO.CRM.API.searchRecord({
        Entity:'Contacts',
        Type:'criteria',
        Query:`JT_Membership_No:equals:${this.$props.id}`,
      })
      if (userResponse?.data) {
        this.user = userResponse.data[0]
        memberStore.setData(userResponse.data[0])
        console.log(this.user)
      }
      const privileges = await window.ZOHO.CRM.API.searchRecord({
        Entity: 'Standard_Privilege',
        Type: 'criteria',
        Query: `((Valid_Tiers:equals:${this.user.Current_Tier})and(Name:starts_with:Gift Box)and(Status:equals:Active))`,
      })
      if (privileges?.data) {
        console.log(privileges?.data)
        this.privileges = privileges.data
      }
      
      const responseUser = await window.ZOHO.CRM.CONFIG.getCurrentUser()
      if (responseUser?.users[0]) {
        userStore.setData(responseUser?.users[0])
      }
      loading.setLoading(false)
    } catch (err) {
      console.debug(err);
      loading.setLoading(false)
    }
  },
  methods: {
    goBack() {
      window.history.back()
    }
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
