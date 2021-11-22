<template>
  <!-- #TODO #17 create individual item component -->
  <div>
    <button v-if="inShoppingList" @click.prevent="deleteItem(item.id)">
      Delete
    </button>
    <button v-else @click.prevent="addItemToShoppingList(item)">
      Add to shoppinglist
    </button>

    <button @click.prevent="increaseItem(item)">+1</button>
    <button @click.prevent="decreaseItem(item)">-1</button>
    <span class="name"> {{ item.name }}: </span>
    <span> {{ item.quantity }} </span>
    <span> {{ item.unit }} </span>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["item"],
  computed: {
    ...mapGetters(["shoppingListProfile"]),
    inShoppingList() {
      return this.item.profile === this.shoppingListProfile;
    },
  },
  methods: {
    ...mapActions([
      "increaseItem",
      "decreaseItem",
      "addItemToShoppingList",
      "deleteItem",
    ]),
  },
};
</script>