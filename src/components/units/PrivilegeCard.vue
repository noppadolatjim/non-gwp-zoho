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
      <div v-else class="mark-use" @click="$emit('openConfirm', [ privilege ])">
        Mark use
      </div>
    </div>
  </div>
</template>

<script>
import { useMemberStore } from '../../stores/member'

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
  },
  data() {
    return {
      isCardModalActive: false,
      barcode: '',
      isLoading: false
    }
  },
  computed: {
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
