<template>
  <!--  <img class="icon" src="./assets/groceries.png"> -->
  <div class="app-header" v-if="initializing">Loading your data</div>
  <div v-else>
    <h1 class="app">{{ appName }}</h1>
    <div class="list-container">
      <gritem-list name="Selected Profile" :profile="getActiveProfileId">
      </gritem-list>

      <gritem-list name="Shopping List" :profile="shoppingListProfile">
      </gritem-list>
    </div>
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
* {
  margin: 0px 0px;
}

#app {
  /* font-family: Helvetica, Arial, sans-serif;  */
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
  background-color: rgb(255, 255, 255);
  padding: 1rem 1rem;
  height: 100%;
}

img.icon {
  display: block;
  margin: auto;
}
html,
body {
  margin: 0;
  height: 100%;
}

div {
  box-sizing: border-box;
}

.app-header {
  display: block;
}

h1.app {
  font-size: 1.5rem;
  margin: 0.5rem 1rem 0.3rem 1rem;
  box-sizing: border-box;
  color: #0969da;
}

h1 {
  font-size: 1rem;
  margin: 0rem;
  box-sizing: border-box;
  color: black;
  vertical-align: middle;
}

.list-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

input {
  background: #f6f8fa;
  border: solid 1px #d0d7de;
  border-radius: 4px;
  padding: 5px 2px 5px 5px;
  margin: 3px 5px 3px 3px;
}

input:focus {
  background: white;
  color: black;
  border: solid 1px #8fc4f8;
  border-radius: 4px;
  padding: 5px 2px 5px 5px;
  margin: 3px 5px 3px 3px;
}

button {
  font-family: "Arial" sans-serif;
  font-size: 0.8em;
  text-align: middle;
  color: rgb(255, 255, 255);
  background: rgb(45, 164, 78);
  margin: 0px 0px 0px 10px;
  padding: 5px 16px;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 6px;
  vertical-align: middle;
  cursor: pointer;
}
</style>
