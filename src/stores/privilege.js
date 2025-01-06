import { defineStore } from 'pinia'

export const usePrivilegeStore = defineStore('privilege', {
  state: () => ({
    data: {},
    selectedPriviledge: ''
  }),
  actions: {
    setData(data) {
      this.data = data
    },
    setUsedPrivilegeLocal(name, voucher, notHide = false) {
      this.data = this.data.map(p => {
        if (p.Privilege_Title === name) {
            return {
              ...p,
              isUsed: true,
              isHidden: false,
              voucher: voucher
            }
        }
        return {
          ...p,
          isHidden: !notHide,
        }
      }).filter(p => !p.isHidden)
    }
  },
  })