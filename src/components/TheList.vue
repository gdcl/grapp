<template>
  <h1>{{ name }}: {{ items.length }} items</h1>
  <ul>
    <li v-for="item in items" :key="item.name">
      <span> {{ item.name }}: </span>
      <span> {{ item.nr }} </span>
      <button @click.prevent="$emit('item-select',item.name)"> {{action}} </button>
      <button @click.prevent="$emit('item-increase',item.name)"> + </button>
      <button @click.prevent="$emit('item-decrease',item.name)"> - </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["name", "items", "direction"],
  emits: ['item-select'],
  computed: {
      action() {
          return (this.direction==='source'?'Add':'Remove')
      }
  }
};
</script>
<style scoped>
h1 {
  font-size: 1rem;
}
button {
	font-family: "Verdana" sans-serif;
	font-size: 0.8em;
	text-align: middle;
	color: blue;
	background: none;
	margin: 0;
	padding: 0 0 0 10px;
	border: none;
	cursor: pointer;
}
</style>