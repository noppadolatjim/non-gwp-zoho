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
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>

export default {
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
    }
  },
  computed: {
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
    },
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
