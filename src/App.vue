<template>
  <!--  <img class="icon" src="./assets/groceries.png"> -->
  <div v-if="initializing">
    <h3>Loading your data</h3>
  </div>
  <div v-else>
    <h3>{{ appName }}</h3>
    <profile-selector />
    <gritem-list name="Selected Profile" :profile="getActiveProfileId" />
    <gritem-list name="Shopping List" :profile="shoppingListProfile" />
    <ul v-if="apiErrors">
      Something went wrong.
      <li v-for="err in apiErrorMessages" :key="err.index">
        <span> {{ err }} </span>
      </li>
    </ul>
  </div>
</template>

<script>
import GritemList from "./components/GritemList.vue";
import ProfileSelector from "./components/ProfileSelector.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Grapp",
  components: {
    GritemList,
    ProfileSelector,
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
* {
  margin: 0px 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  background-color: rgba(4, 129, 101, 1);
  padding: 1rem 1rem;
  height: 100%;
}

img.icon {
  display: block;
  margin: auto;
}
html,
body {
  height: 100%;
}
</style>
