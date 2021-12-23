<template>
  <div
    v-if="open"
    class="backdrop"
  />
  <base-card
    v-if="open"
    modal="true"
  >
    <template #header>
      <slot name="dialogTitle" />
    </template>
    <slot name="dialogBody" />
  </base-card>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true
    }
  }
}
</script>
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}
</style>