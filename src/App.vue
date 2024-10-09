<!-- eslint-disable prettier/prettier -->
<script setup>
</script>

<template>
  <main>
    Name: {{ user?.Full_Name }} <br />
    Vouchers: {{ displayVouchers }}
  </main>
</template>
<script>
export default {
  props: {
    id: String,
  },
  data() {
    return {
      count: 0,
      user: null,
      vouchers: [],
    };
  },
  computed: {
    displayVouchers() {
      return this.vouchers.map((voucher) => voucher.Name).join(', ');
    },
  },
  async mounted() {
    try {
      const userResponse = await window.ZOHO.CRM.API.searchRecord({
        Entity:'Contacts',
        Type:'criteria',
        Query:`JT_Membership_No:equals:${this.$props.id}`,
      })
      if (userResponse?.data) {
        this.user = userResponse.data[0]
      }
      const voucherResponse = await window.ZOHO.CRM.API.searchRecord({
        Entity: 'Voucher',
        Type: 'criteria',
        Query: `Contact_Name:equals:${this.user.Full_Name}`,
      });
      if (userResponse?.data) {
        this.vouchers = voucherResponse.data;
      }
    } catch (err) {
      console.debug(err);
    }
  },
};
</script>

<style scoped>
</style>
