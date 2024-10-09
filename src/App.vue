<!-- eslint-disable prettier/prettier -->
<script setup>
</script>

<template>
  <div class="container">
    <MembershipDetailCard
      :name="user?.Full_Name"
      :member-no="user?.JT_Membership_No"
      :vouchers="vouchers"
      :tier="user?.Current_Tier"
    />
  </div>
</template>
<script>
import MembershipDetailCard from './components/MembershipDetailCard.vue'

export default {
  components: {
    MembershipDetailCard,
  },
  props: {
    id: String,
  },
  data() {
    return {
      count: 0,
      user: null,
      vouchers: [
  {
    "Is_Standard_Privilege": true,
    "Owner": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "$currency_symbol": "THB",
    "$field_states": null,
    "Redeem_Privilege": null,
    "Redeem_Date": null,
    "Using_at_Opening_Hours": "Open Daily and Opening Hours depends on each store",
    "Voucher_Validity_Period": "Month",
    "Name": "1,000 ฿ OFF Happy Birthday Discount",
    "Voucher_Code": "HBD100024",
    "Last_Activity_Time": "2024-09-30T23:30:25+07:00",
    "Marked_by_Admin": false,
    "Privilege_Title": "1,000 ฿ OFF Happy Birthday Discount",
    "$state": "save",
    "Unsubscribed_Mode": null,
    "$process_flow": false,
    "Exchange_Rate": 1,
    "Used_Store": null,
    "Standard_Privilege": {
      "module": "CustomModule17",
      "name": "1,000 ฿ OFF Happy Birthday Discount",
      "id": "4994453000002049239"
    },
    "Currency": "THB",
    "Redeem_By": null,
    "Marked_Used_By": null,
    "$locked_for_me": false,
    "id": "4994453000002394167",
    "Using_at_Location_Longitude": null,
    "$approved": true,
    "Discount_Amount": 1000,
    "$approval": {
      "delegate": false,
      "takeover": false,
      "approve": false,
      "reject": false,
      "resubmit": false
    },
    "Point_to_Baht1": null,
    "Created_Time": "2024-09-23T15:41:34+07:00",
    "$editable": true,
    "Voucher_Valid_Until": "2024-09-30",
    "Redeem_Channel": null,
    "Valid_Duration": "1",
    "Discount_Percent_Fashsion": null,
    "Discount_Percent_HF": null,
    "$status": "cm_46-46",
    "Using_at_Email": "excellent@jimthompson.com",
    "Created_By": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "$zia_owner_assignment": "owner_recommendation_unavailable",
    "Discount_Percent": null,
    "Sub_Type": "Birthday",
    "Description": "Privilege exclusive birthday voucher for our Jim Thompson membership on your birth month.",
    "$photo_id": null,
    "Voucher_Value": 1000,
    "$review_process": { "approve": false, "reject": false, "resubmit": false },
    "Terms_Conditions": "1. This voucher is valid only on your birth month.\n2. This voucher is valid for use with minimum spend of 12,000 baht.\n3.This voucher is valid at our retail (normal price) only (except outlet, retail shop @ King Power, Airport, Restaurant, Cafรฉ and online website).\n4. This cash voucher is for one-time use only and any unused values will not be refunded.\n5. This cash voucher is not refundable or exchangeable for cash.\n6. Customer must present the e-voucher @ cashier before cart check-out or asking our sales associate to support on their system.\n7. Jim Thompson reserves the right to reject any printed, screen-capture voucher if customer cannot present the e-voucher via our https://www.member.jimthompson.com customer touchpoint only.\n8. Jim Thompson reserves the right to change conditions without prior notice.\n9. This cash voucher can be used in conjunction with privilege tier discount and promotion products.",
    "Type_of_Privilege": "Discount",
    "Record_Image": null,
    "Voucher_Status": "Expired",
    "Modified_By": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "Using_at_Address": "Depends on stores location",
    "$review": null,
    "Privilege_Sub_Title": "Using at Jim Thompson Website and Full Price Retail Stores in Thailand",
    "Spending_Points": null,
    "Email_Opt_Out": false,
    "Using_at_Location_Latitude": null,
    "Discount_Percent_Food": null,
    "Modified_Time": "2024-09-30T23:30:25+07:00",
    "Unsubscribed_Time": null,
    "Used_Date_Time": null,
    "Using_at_Contact_Phone": null,
    "Redeem_Store": null,
    "$orchestration": false,
    "Contact_Name": {
      "module": "Contacts",
      "name": "Sandbox_Without contact id NidxCT100789015",
      "id": "4994453000002367292"
    },
    "Voucher_Cost": 12000,
    "Reservation_Required": false,
    "$in_merge": false,
    "Redeem_Type": null,
    "Locked__s": false,
    "Record_Image_Link": "https://member.jimthompson.com/images/promotion1.png",
    "Tag": [],
    "$approval_state": "approved"
  },
  {
    "Is_Standard_Privilege": true,
    "Owner": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "$currency_symbol": "THB",
    "$field_states": null,
    "Redeem_Privilege": null,
    "Redeem_Date": null,
    "Using_at_Opening_Hours": "Open Daily and Opening Hours depends on each store",
    "Voucher_Validity_Period": "Month",
    "Name": "1,500 ฿ OFF Happy Birthday Discount",
    "Voucher_Code": "HBD150024",
    "Last_Activity_Time": "2024-09-23T15:41:33+07:00",
    "Marked_by_Admin": false,
    "Privilege_Title": "1,500 ฿ OFF Happy Birthday Discount",
    "$state": "save",
    "Unsubscribed_Mode": null,
    "$process_flow": false,
    "Exchange_Rate": 1,
    "Used_Store": null,
    "Standard_Privilege": {
      "module": "CustomModule17",
      "name": "1,500 ฿ OFF Happy Birthday Discount",
      "id": "4994453000002049240"
    },
    "Currency": "THB",
    "Redeem_By": null,
    "Marked_Used_By": null,
    "$locked_for_me": false,
    "id": "4994453000002379062",
    "Using_at_Location_Longitude": null,
    "$approved": true,
    "Discount_Amount": 1500,
    "$approval": {
      "delegate": false,
      "takeover": false,
      "approve": false,
      "reject": false,
      "resubmit": false
    },
    "Point_to_Baht1": null,
    "Created_Time": "2024-09-23T15:40:29+07:00",
    "$editable": true,
    "Voucher_Valid_Until": "2024-09-30",
    "Redeem_Channel": null,
    "Valid_Duration": "1",
    "Discount_Percent_Fashsion": null,
    "Discount_Percent_HF": null,
    "$status": "cm_46-46",
    "Using_at_Email": "excellent@jimthompson.com",
    "Created_By": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "$zia_owner_assignment": "owner_recommendation_unavailable",
    "Discount_Percent": null,
    "Sub_Type": "Birthday",
    "Description": "Privilege exclusive birthday voucher for our Jim Thompson membership on your birth month.",
    "$photo_id": null,
    "Voucher_Value": 1500,
    "$review_process": { "approve": false, "reject": false, "resubmit": false },
    "Terms_Conditions": "1. This voucher is valid only on your birth month.\n2. This voucher is valid for use with minimum spend of 12,000 baht.\n3.This voucher is valid at our retail (normal price) only (except outlet, retail shop @ King Power, Airport, Restaurant, Cafรฉ and online website).\n4. This cash voucher is for one-time use only and any unused values will not be refunded.\n5. This cash voucher is not refundable or exchangeable for cash.\n6. Customer must present the e-voucher @ cashier before cart check-out or asking our sales associate to support on their system.\n7. Jim Thompson reserves the right to reject any printed, screen-capture voucher if customer cannot present the e-voucher via our https://www.member.jimthompson.com customer touchpoint only.\n8. Jim Thompson reserves the right to change conditions without prior notice.\n9. This cash voucher can be used in conjunction with privilege tier discount and promotion products.",
    "Type_of_Privilege": "Discount",
    "Record_Image": null,
    "Voucher_Status": "Cancelled",
    "Modified_By": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "Using_at_Address": "Depends on stores location",
    "$review": null,
    "Privilege_Sub_Title": "Using at Jim Thompson Website and Full Price Retail Stores in Thailand",
    "Spending_Points": null,
    "Email_Opt_Out": false,
    "Using_at_Location_Latitude": null,
    "Discount_Percent_Food": null,
    "Modified_Time": "2024-09-23T15:41:33+07:00",
    "Unsubscribed_Time": null,
    "Used_Date_Time": null,
    "Using_at_Contact_Phone": null,
    "Redeem_Store": null,
    "$orchestration": false,
    "Contact_Name": {
      "module": "Contacts",
      "name": "Sandbox_Without contact id NidxCT100789015",
      "id": "4994453000002367292"
    },
    "Voucher_Cost": 12000,
    "Reservation_Required": false,
    "$in_merge": false,
    "Redeem_Type": null,
    "Locked__s": false,
    "Record_Image_Link": "https://member.jimthompson.com/images/promotion1.png",
    "Tag": [],
    "$approval_state": "approved"
  },
  {
    "Is_Standard_Privilege": true,
    "Owner": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "$currency_symbol": "THB",
    "$field_states": null,
    "Redeem_Privilege": null,
    "Redeem_Date": null,
    "Using_at_Opening_Hours": "Open Daily and Opening Hours depends on each store",
    "Voucher_Validity_Period": "Month",
    "Name": "1,000 ฿ OFF Happy Birthday Discount",
    "Voucher_Code": "HBD100024",
    "Last_Activity_Time": "2024-09-23T15:40:30+07:00",
    "Marked_by_Admin": false,
    "Privilege_Title": "1,000 ฿ OFF Happy Birthday Discount",
    "$state": "save",
    "Unsubscribed_Mode": null,
    "$process_flow": false,
    "Exchange_Rate": 1,
    "Used_Store": null,
    "Standard_Privilege": {
      "module": "CustomModule17",
      "name": "1,000 ฿ OFF Happy Birthday Discount",
      "id": "4994453000002049239"
    },
    "Currency": "THB",
    "Redeem_By": null,
    "Marked_Used_By": null,
    "$locked_for_me": false,
    "id": "4994453000002385132",
    "Using_at_Location_Longitude": null,
    "$approved": true,
    "Discount_Amount": 1000,
    "$approval": {
      "delegate": false,
      "takeover": false,
      "approve": false,
      "reject": false,
      "resubmit": false
    },
    "Point_to_Baht1": null,
    "Created_Time": "2024-09-23T15:39:56+07:00",
    "$editable": true,
    "Voucher_Valid_Until": "2024-09-30",
    "Redeem_Channel": null,
    "Valid_Duration": "1",
    "Discount_Percent_Fashsion": null,
    "Discount_Percent_HF": null,
    "$status": "cm_46-46",
    "Using_at_Email": "excellent@jimthompson.com",
    "Created_By": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "$zia_owner_assignment": "owner_recommendation_unavailable",
    "Discount_Percent": null,
    "Sub_Type": "Birthday",
    "Description": "Privilege exclusive birthday voucher for our Jim Thompson membership on your birth month.",
    "$photo_id": null,
    "Voucher_Value": 1000,
    "$review_process": { "approve": false, "reject": false, "resubmit": false },
    "Terms_Conditions": "1. This voucher is valid only on your birth month.\n2. This voucher is valid for use with minimum spend of 12,000 baht.\n3.This voucher is valid at our retail (normal price) only (except outlet, retail shop @ King Power, Airport, Restaurant, Cafรฉ and online website).\n4. This cash voucher is for one-time use only and any unused values will not be refunded.\n5. This cash voucher is not refundable or exchangeable for cash.\n6. Customer must present the e-voucher @ cashier before cart check-out or asking our sales associate to support on their system.\n7. Jim Thompson reserves the right to reject any printed, screen-capture voucher if customer cannot present the e-voucher via our https://www.member.jimthompson.com customer touchpoint only.\n8. Jim Thompson reserves the right to change conditions without prior notice.\n9. This cash voucher can be used in conjunction with privilege tier discount and promotion products.",
    "Type_of_Privilege": "Discount",
    "Record_Image": null,
    "Voucher_Status": "Cancelled",
    "Modified_By": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "Using_at_Address": "Depends on stores location",
    "$review": null,
    "Privilege_Sub_Title": "Using at Jim Thompson Website and Full Price Retail Stores in Thailand",
    "Spending_Points": null,
    "Email_Opt_Out": false,
    "Using_at_Location_Latitude": null,
    "Discount_Percent_Food": null,
    "Modified_Time": "2024-09-23T15:40:30+07:00",
    "Unsubscribed_Time": null,
    "Used_Date_Time": null,
    "Using_at_Contact_Phone": null,
    "Redeem_Store": null,
    "$orchestration": false,
    "Contact_Name": {
      "module": "Contacts",
      "name": "Sandbox_Without contact id NidxCT100789015",
      "id": "4994453000002367292"
    },
    "Voucher_Cost": 12000,
    "Reservation_Required": false,
    "$in_merge": false,
    "Redeem_Type": null,
    "Locked__s": false,
    "Record_Image_Link": "https://member.jimthompson.com/images/promotion1.png",
    "Tag": [],
    "$approval_state": "approved"
  },
  {
    "Is_Standard_Privilege": true,
    "Owner": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "$currency_symbol": "THB",
    "$field_states": null,
    "Redeem_Privilege": null,
    "Redeem_Date": null,
    "Using_at_Opening_Hours": "Open Daily and Opening Hours depends on each store",
    "Voucher_Validity_Period": "Year",
    "Name": "5% OFF Welcome Discount",
    "Voucher_Code": "Welcome",
    "Last_Activity_Time": null,
    "Marked_by_Admin": false,
    "Privilege_Title": "5% OFF Welcome Discount",
    "$state": "save",
    "Unsubscribed_Mode": null,
    "$process_flow": false,
    "Exchange_Rate": 1,
    "Used_Store": null,
    "Standard_Privilege": {
      "module": "CustomModule17",
      "name": "5% OFF Welcome Discount",
      "id": "4994453000002049237"
    },
    "Currency": "THB",
    "Redeem_By": null,
    "Marked_Used_By": null,
    "$locked_for_me": false,
    "id": "4994453000002372045",
    "Using_at_Location_Longitude": null,
    "$approved": true,
    "Discount_Amount": null,
    "$approval": {
      "delegate": false,
      "takeover": false,
      "approve": false,
      "reject": false,
      "resubmit": false
    },
    "Point_to_Baht1": null,
    "Created_Time": "2024-09-23T15:34:50+07:00",
    "$editable": true,
    "Voucher_Valid_Until": "2025-09-23",
    "Redeem_Channel": null,
    "Valid_Duration": "1",
    "Discount_Percent_Fashsion": 5,
    "Discount_Percent_HF": 5,
    "$status": "c_46",
    "Using_at_Email": "excellent@jimthompson.com",
    "Created_By": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "$zia_owner_assignment": "owner_recommendation_unavailable",
    "Discount_Percent": null,
    "Sub_Type": "Welcome Pack",
    "Description": "Privilege exclusive welcome to Jim Thompson Membership program.",
    "$photo_id": null,
    "Voucher_Value": null,
    "$review_process": { "approve": false, "reject": false, "resubmit": false },
    "Terms_Conditions": "1. This voucher is valid only 1 year after your membership registration successes.\n2. This voucher is valid at our retail (normal price) only (except outlet, retail shop @ King Power, Airport, Restaurant, Cafรฉ and online website).\n3. This cash voucher is for one-time use only and any unused values will not be refunded.\n4. This cash voucher is not refundable or exchangeable for cash.\n5. Customer must present the e-voucher @ cashier before cart check-out.\n6. Jim Thompson reserves the right to reject any printed, screen-capture voucher if customer cannot present the e-voucher via our https://member.jimthompson.com customer touchpoint only.\n7. Jim Thompson reserves the right to change conditions without prior notice.\n8. This cash voucher can be used in conjunction with privileges tier discount and promotion products.",
    "Type_of_Privilege": "Discount",
    "Record_Image": null,
    "Voucher_Status": "Redeem",
    "Modified_By": {
      "name": "CRM Admin",
      "id": "4994453000000397001",
      "email": "thitinan.n@jimthompson.com"
    },
    "Using_at_Address": "Depends on stores location",
    "$review": null,
    "Privilege_Sub_Title": "Using at Jim Thompson Website and Full Price Retail Stores in Thailand",
    "Spending_Points": null,
    "Email_Opt_Out": false,
    "Using_at_Location_Latitude": null,
    "Discount_Percent_Food": null,
    "Modified_Time": "2024-09-23T15:34:50+07:00",
    "Unsubscribed_Time": null,
    "Used_Date_Time": null,
    "Using_at_Contact_Phone": null,
    "Redeem_Store": null,
    "$orchestration": false,
    "Contact_Name": {
      "module": "Contacts",
      "name": "Sandbox_Without contact id NidxCT100789015",
      "id": "4994453000002367292"
    },
    "Voucher_Cost": 0,
    "Reservation_Required": false,
    "$in_merge": false,
    "Redeem_Type": null,
    "Locked__s": false,
    "Record_Image_Link": "https://media.jimthompson.com/665afadb-215d-491c-80f7-952431e97000.png",
    "Tag": [],
    "$approval_state": "approved"
  }
],
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
