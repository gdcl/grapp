<template>
  <div v-if="open" class="backdrop"></div>
  <base-card v-if="open" modal="true">
    <template v-slot:header> 
      <slot name="dialogTitle"></slot>
    </template>
      <slot name="dialogBody"></slot>
  </base-card>
</template>
<script>
export default {
  props: ["open"],
};
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