<template>
  <select @change="$emit('update:modelValue', $event.target.value)">
    <option v-for="el in list" 
      :value="el"
      :key="el"
      :selected="modelValue === el">
     Option: {{ el }}
    </option>  

<!--    <option
      :selected="modelValue === '1'"
      value="1"
      key="1"
    >
      One
    </option>

    <option
      :selected="modelValue === '2'"
      value="2"
      key="2"
    >
      Two
    </option>
    <option
      :selected="modelValue === '3'"
      value="3"
      key="3"
    >
      Three
    </option>
    -->
    <!-- 
    <option v-for="prf in profiles" :value="prf.id" :key="prf.id">
      {{ prf.name }}
    </option>
    -->
  </select>
</template>
<script>
export default {
  props: ["modelValue", "list"],
  emits: ["update:modelValue"],
  // data() {
  //   return {
  //     selected: 2,
  //   };
  // },
  // updated() {
  //     this.selected=this.selection;
  // }
  // computed: {
  //   selected() {
  //     return this.modelValue;
  //   },
  // },
};
</script>