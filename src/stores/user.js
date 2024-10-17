import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ data: null }),
    actions: {
      setData(data) {
        this.data = data
      },
    },
  })