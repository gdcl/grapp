<template>
  Testing Vuex store
  <section>
    <button @click="getItems">load items</button>
    <button @click="getProfiles">load profiles</button>
    <button
      @click="createItem({ name: 'new item', quantity: 3, profile: { id: 1 } }  )"
    >
      New Item
    </button>
    Initializing: {{ initializing }}
    <h1>State</h1>
    <h3>Items all</h3>
    <ol>
      <li v-for="item in items" :key="item.id">
        {{ item }}
        <button @click="deleteItem(item.id)">Delete</button>
        <button @click="increaseItem(item)">+</button>
        <button @click="decreaseItem(item)">-</button>
      </li>
    </ol>
    <h3>Items filtered</h3>
    <div>
      <select v-model="activeProfileId">
        <option v-for="prf in profiles" :value="prf.id" :key="prf.id">
          {{ prf.name }}
        </option>
      </select>
    </div>
    <h3>Items</h3>
    <ol>
      <li v-for="item in activeProfileItems" :key="item.id">
        {{ item }}
      </li>
    </ol>
  </section>
  <!-- <section>
    <h1>Getters</h1>
    <h3>getItems</h3>
    {{ getItems }}
    <h3>getProfiles</h3>
    {{ getProfiles }}
  </section> -->
  <section>
    <div>Error: {{ apiErrors }}</div>
    <div>
      <span> Error Message(s) </span>
      <p v-for="error in apiErrorMessages" :key="error.id">
        {{ error }}
      </p>
    </div>
  </section>
</template>

<script>
import Vuex from "vuex";
export default {
  name: "Grapp Vuex",
  data() {
    return {
      activeProfileId: null,
    };
  },
  computed: {
    ...Vuex.mapState([
      "items",
      "profiles",
      "initializing",
      "apiErrorMessages",
      "isLoggedIn",
      "users",
    ]),
    activeProfileItems() {
      return this.activeProfileId
        ? this.getItemsByProfile(this.activeProfileId)
        : [];
    },
    ...Vuex.mapGetters(["apiErrors", "getItemsByProfile"]),
  },
  methods: {
    ...Vuex.mapActions([
      "getItems",
      "getProfiles",
      "createItem",
      "deleteItem",
      "increaseItem",
      "decreaseItem",
      "bootStrapStore",
    ]) /*,
    loadItems() {
      this.$store.dispatch("getItems");
    },
    loadProfiles() {
      this.$store.dispatch("getProfiles");
    },
    newItem() {
      this.$store.dispatch("createItem", { name: "test", quantity: 4 });
    },
    deleteItem(id) {
      this.$store.dispatch("deleteItem", id);
    },*/,
  },
  mounted() {
    this.bootStrapStore();
  },
};
</script>