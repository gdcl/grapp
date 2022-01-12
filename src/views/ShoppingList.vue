<template>
  <!--  <img class="icon" src="./assets/groceries.png"> -->
  <div class="app-header" v-if="initializing">Loading your data</div>
  <div v-else>
    <!-- <h1 class="app">{{ appName }}</h1> -->
    <div class="list-container">
      <gritem-list listName="Selected Profile" :profile="getActiveProfileId" />
      <gritem-list listName="Shopping List" :profile="shoppingListProfile" />
    </div>
    <ul v-if="apiErrors">
      Something went wrong.
      <li v-for="err in apiErrorMessages" :key="err.index">
        <span>{{ err }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import GritemList from "../components/GritemList.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Grapp",
  components: {
    GritemList,
  },
  computed: {
    ...mapState(["initializing", "apiErrorMessages"]),
    ...mapGetters(["shoppingListProfile", "apiErrors", "getActiveProfileId"]),
    appName() {
      return process.env.VUE_APP_NAME;
    },
  },
  methods: {
    ...mapActions(["bootStrapStore"]),
  },

  async beforeMount() {
    await this.bootStrapStore();
  },
};
</script>
<style>
</style>
