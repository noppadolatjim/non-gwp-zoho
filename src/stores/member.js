import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', {
    state: () => ({ data: null }),
    actions: {
      setData(data) {
        this.data = data
      },
    },
  })