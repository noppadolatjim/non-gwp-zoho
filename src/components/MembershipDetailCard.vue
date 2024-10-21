<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Member Information</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="columns is-0">
          <div class="column pa-1">
            JT Membership No: <span class="has-text-weight-bold">{{ memberNo }}</span>
          </div>
          <div class="column pa-1">
            Tier: <b-tag rounded :style="{ backgroundColor: tagColor }"><span class="has-text-weight-bold">{{ tier }}</span></b-tag>
          </div>
        </div>
        <div class="columns is-0">
          <div class="column pa-1">
            Name: <span class="has-text-weight-bold">{{ name }}</span>
          </div>
          <div class="column pa-1">
            Date: <span class="has-text-weight-bold">{{ displayStartDate }} - {{ displayEndDate }}</span>
          </div>
        </div>
        <div class="columns" v-if="privileges.length > 0">
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
              />
            </div>
          </div>
        </div>
        <div
          class="no-privileges"
          v-else
        >
          <p>No available privilege.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePrivilegeStore } from '../stores/privilege'

import PrivilegeCard from './units/PrivilegeCard.vue'
export default {
  components: {
    PrivilegeCard,
  },
  props: {
    memberNo: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    tier: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      startDate: new Date('2024-11-1'),
      endDate: new Date('2024-11-30'),
    }
  },
  computed: {
    privileges() {
      const privilegeStore = usePrivilegeStore()
      return privilegeStore.data
    },
    displayStartDate() {
      return this.getFormattedDate(this.startDate)
    },
    displayEndDate() {
      return this.getFormattedDate(this.endDate)
    },
    tagColor() {
      switch (this.$props.tier) {
        case 'Silk Discovery':
          return '#f8e199'
        case 'Silk Premier':
          return '#c4f0b3'
        case 'Silk Reserve':
          return '#f6c1ff'
        default:
          return '#ffd6bc'
      }
    }
  },
  methods: {
    getFormattedDate(date) {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      
      return `${day}/${month}/${year}`
    }
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.column {
  padding: 0.25rem !important;
}

.no-privileges {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #dddddd;
  margin: 4px;
}

.warning {
  color: rgb(255, 29, 74);
}
</style>
