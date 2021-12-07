<template>
  <!-- #TODO #17 create individual item component -->
  <div class="row">
    <div class="theitem">{{ item.name }}: {{ total }}</div>
    <div class="actions">
      <button v-if="inShoppingList" @click.prevent="deleteItem(item.id)">
        Remove
      </button>
      <button v-else @click.prevent="addItemToShoppingList(item)">Add</button>

      <button @click.prevent="increaseItem(item)">+1</button>
      <button @click.prevent="decreaseItem(item)">-1</button>
    </div>
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
    total() {
      return this.item.unit
        ? `${this.item.quantity} ${this.item.unit}`
        : `${this.item.quantity}`;
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
<style scoped>
span {
  margin-left: 5px;
}

button {
  font-family: "Arial" sans-serif;
  font-size: 1em;
  text-align: middle;
  color: #0969da;
  background: none;
  margin: 0;
  padding: 0 0 0 5px;
  border: none;
  cursor: pointer;
}

.row {
  padding: 8px 10px;
  border-bottom: 1px solid rgb(208, 215, 222);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.row:hover {
  padding: 8px 10px;
  border-bottom: 1px solid rgb(208, 215, 222);
  box-sizing: border-box;
  background-color: #f6f8fa;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/* div.theitem {
  display: inline;
}

div.actions {
  display: inline;
} */
</style>