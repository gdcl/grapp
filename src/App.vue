<template>
  <!--  <img class="icon" src="./assets/groceries.png"> -->
  <div v-if="initializing">
    <h3>Loading your data</h3>
  </div>
  <div v-else>
    <h3> {{ appName }} </h3>
    <ItemList
      name="Saved Profile"
      v-model:activeProfileId="activeProfileId"
      :profiles="profilesList"
      :items="activeProfileItems"
      @select-item="selectItem"
      @increase-item="increaseItem"
      @decrease-item="decreaseItem"
      @new-item="addItem"
      @new-profile="newProfile"
    />
    <ItemList
      name="List for Today"
      profiles="none"
      v-model:activeProfileId="currentProfileId"
      :items="currentItems"
      @select-item="selectItem"
      @increase-item="increaseItem"
      @decrease-item="decreaseItem"
      @new-item="addItem"
    />
  </div>
  <ul v-if="error">
    Something went wrong.
    <li v-for="err in errorMessages" :key="err.index">
      <span> Error: {{ err.message }} </span>
      <span> Code: {{ err.extensions.code }} </span>
    </li>
  </ul>
</template>

<script>
import ItemList from "./components/ItemList.vue";
import { api, directusApi, log } from "./api.js";

export default {
  name: "App",
  components: {
    ItemList,
  },
  data() {
    return {
      items: [],
      user: "guy.duchatelet",
      error: false,
      errorMessages: [],
      profiles: [],
      activeProfileId: "",
      initializing: true,
    };
  },
  computed: {
    //invariant should be that there is always a 'current' profile for a user
    currentProfileId() {
      const current = this.profiles.filter(
        (profile) => profile.name === "current"
      );
      return current.length > 0 ? current[0].id : 0;
    },

    profilesList() {
      return this.profiles.filter((profile) => profile.name !== "current");
    },
    currentItems() {
      return this.items.filter((item) => item.profile.name === "current");
    },
    activeProfileItems() {
      return this.items.filter(
        (item) => parseInt(item.profile.id) === parseInt(this.activeProfileId)
      );
    },

    appName() {
      return process.env.VUE_APP_NAME;
    }
  },

  methods: {
    async newProfile(name) {
      log("newProfile called ");
      const result = await directusApi.newProfile(name);
      log("newProfile result: ");
      log(result);
      this.profiles.push(result);
      this.activeProfileId = result.id;
    },

    async getProfiles() {
      const result = await directusApi.getProfiles();
      this.handleResult(result, "getProfiles");
      return result;
    },

    async getItems() {
      const result = await directusApi.getItems();
      this.handleResult(result, "getItems");
      return result;
    },

    async addItem(item) {
      const result = await api.addItem(item, this.items);
      this.handleResult(result, "addItem");
    },

    async increaseItem(item) {
      const result = await api.increaseItem(item);
      this.handleResult(result, "increaseItem");
    },

    async decreaseItem(item) {
      const result = await api.decreaseItem(item);
      this.handleResult(result, "decreaseItem");
    },

    async selectItem(item) {
      const result = await api.selectItem(
        item,
        this.items,
        this.currentProfileId
      );
      this.handleResult(result, "selectItem");
    },

    handleResult(result, caller) {
      log(`${caller} was called`);
      log(result);
      if (result && "errors" in result) {
        this.error = true;
        this.errorMessages = result["errors"];
        return;
      } else {
        this.error = false;
        this.errorMessages = [];
        if (caller === "getProfiles") {
          this.profiles = result.data;
        }
        if (caller === "newProfile") {
          this.activeProfile = result.data.id;
        }
        if (caller === "getItems") {
          this.items = result.data;
        } else {
          this.getItems();
        }
      }
    },
  },

  async beforeMount() {
    await Promise.all([this.getProfiles(), this.getItems()]);
    if (this.profilesList.length>0) {
      this.activeProfileId = this.profilesList[0].id;
    } 
    this.initializing = false;
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
