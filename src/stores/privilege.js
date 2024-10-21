import { defineStore } from 'pinia'

export const usePrivilegeStore = defineStore('privilege', {
  state: () => ({ data: [] }),
  actions: {
    setData(data) {
      this.data = data
    },
    setUsedPrivilegeLocal(id, voucher) {
      this.data = this.data.map(p => {
        if (p.id === id) {
            return {
              ...p,
              isUsed: true,
              isHidden: false,
              voucher: voucher
            }
        }
        return {
          ...p,
          isHidden: true,
        }
      }).filter(p => !p.isHidden)
    }
  },
  })