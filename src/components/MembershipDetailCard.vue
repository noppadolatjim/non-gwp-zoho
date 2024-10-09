<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Member Information</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div class="column is-one-fifth has-text-right">
            JT Membership No:
          </div>
          <div class="column">
            {{ memberNo }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-fifth has-text-right">
            Name:
          </div>
          <div class="column">
            {{ name }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-fifth has-text-right">
            Tier:
          </div>
          <div class="column">
            <b-tag rounded :style="{ backgroundColor: tagColor }">{{ tier }}</b-tag>
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-fifth has-text-right">
            Vouchers:
          </div>
          <div class="column card-container">
            <VoucherCard
              v-for="(voucher, index) in vouchers"
              :key="index"
              :voucher="voucher"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VoucherCard from './units/VoucherCard.vue'
export default {
  components: {
    VoucherCard,
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
    vouchers: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
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
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
