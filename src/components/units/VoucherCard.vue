<template>
  <div class="wrapper">
    <div class="flex-row">
      <div class="img-wrapper">
        <img
          :src="voucher.Record_Image_Link"
          alt="voucher image"
          class="voucher-img"
        />
      </div>
      <div class="detail">
          <p class="name">{{ voucher.Name }}</p>
          <p>{{ voucher.Description }}</p>
      </div>
      <div class="mark-use">
        Mark use
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    voucher: {
      type: Object,
      default: () => null,
    }
  }
}
</script>

<style scoped>
.wrapper {
  overflow: hidden;
  height: 120px;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.img-wrapper {
  height: 120px;
  width: 120px;
}

.voucher-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail {
  padding: 0.5rem;
  flex: 1;
  border-right: 2px dashed #fca06b;
}
.name {
  margin-bottom: 0 !important;
  font-size: 1.25rem;
}
.mark-use {
  background-color: #ff7a2d;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  flex: 0;
  padding: 0.5rem;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
