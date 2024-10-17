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
            Privileges:
          </div>
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
          <div
            class="no-privileges"
            v-else
          >
            <p>No available privilege.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    privileges: {
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
</style>
