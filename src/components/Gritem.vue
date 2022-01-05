<template>
  <div class="row">
    <div class="theitem">{{ item.name }}: {{ total }}</div>
    <div class="actions">
      <button @click.prevent="increaseItem(item)" test-data="increase">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
        </svg>
      </button>
      <button @click.prevent="decreaseItem(item)" test-data="decrease">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
      </button>
      <button v-if="inShoppingList" @click.prevent="deleteItem(item.id)" test-data="delete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
      </button>
      <button v-else @click.prevent="addItemToShoppingList(item)" test-data="shoppingList">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
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
  /* font-family: "Arial" sans-serif;
  font-size: 1em;
  text-align: middle;
  color: #0969da; */
  background: none;
  margin: 0;
  padding: 0 0 0 0.6rem;
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
  justify-items: center;
  align-items: center;
}

.row:hover {
  /* padding: 8px 10px;
  border-bottom: 1px solid rgb(208, 215, 222);
  box-sizing: border-box; */
  background-color: #f6f8fa;
  /* display: flex;
  flex-direction: row;
  justify-content: space-between; */
}

div.theitem {
  text-align: center;
}
</style>
