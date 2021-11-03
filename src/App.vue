<template>
  <!--  <img class="icon" src="./assets/groceries.png"> -->
  <TheSelect v-model="appSelection" :list="list">
  </TheSelect>
  <TheList
    name="Saved Profile"
    type="profile"
    v-model.number:activeProfileId="activeProfileId"
    :profiles="profilesList"
    :items="activeProfileItems"
    @select-item="selectItem"
    @increase-item="increaseItem"
    @decrease-item="decreaseItem"
    @new-item="addItem"
    @new-profile="newProfile"
  />
  <TheList
    name="List for Today"
    type="current"
    :profiles="[]"
    v-model:activeProfileId="currentProfileId"
    :items="currentItems"
    @select-item="selectItem"
    @increase-item="increaseItem"
    @decrease-item="decreaseItem"
    @new-item="addItem"
  />
  <ul v-if="error">
    Something went wrong.
    <li v-for="err in errorMessages" :key="err.index">
      <span> Error: {{ err.message }} </span>
      <span> Code: {{ err.extensions.code }} </span>
    </li>
  </ul>
</template>

<script>
import TheList from "./components/TheList.vue";
import TheSelect from "./components/TheSelect.vue";
import { api, directusApi, log } from "./api.js";

export default {
  name: "App",
  components: {
    TheList,
    TheSelect
  },
  data() {
    return {
      items: [],
      user: "guy.duchatelet",
      error: false,
      errorMessages: [],
      profiles: [],
      activeProfileId: "",
      list: ["foo","bar","mega", "lollypop"],
      appSelection: "bar"
    };
  },
  computed: {
    //invariant should be that there is always a 'current' profile for a user
    currentProfileId() {
      log(this.profiles);
      const current = this.profiles.filter((profile) => profile.name === "current");
      log(current);
      return (current[0].id)
    },
    profilesList() {
      return this.profiles.filter((profile) => profile.name !== "current");
    },
    currentItems() {
      return this.items.filter((item) => item.profile.name === "current");
    },
    activeProfileItems() {
      return this.items.filter(
        (item) => item.profile.id === this.activeProfileId
      );
    },
  },

  methods: {
    appSelect(value) {
      console.log(`appSelect called with value: ${value}`);
//      console.log(`event.target.value: ${event.target.value}`);
    },

    select(event) {
      console.log(event.target.value);
      log(event);
    },

    async newProfile(name) {
      console.log('prior to newProfile');
      const result = await directusApi.newProfile(name);
      console.log('after newProfile. Result is '+ JSON.stringify(result));
      this.handleResult(await directusApi.getProfiles(), "getProfiles");
      console.log('after getProfiles');
//      this.handleResult(result, "newProfile");
//      console.log('after handleResult of newProfile');
      this.changeProfile(result.id);
    },

    changeProfile(id) {
      const newActiveProfile = this.profilesList.filter(
        (profile) => parseInt(profile.id) === parseInt(id)
      )[0];
      this.activeProfile = newActiveProfile;
    },
    async getProfiles() {
      const result = await directusApi.getProfiles();
      this.handleResult(result, "getProfiles");
    },

    async getItems() {
      const result = await directusApi.getItems();
      this.handleResult(result, "getItems");
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
        this.currentProfile
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
          this.profiles = result["data"];
        }
        if (caller === "newProfile") {
          this.activeProfile = result["data"];
        }
        if (caller === "getItems") {
          this.items = result["data"];
        } else {
          this.getItems();
        }
      }
    },
  },

  async created() {
    await Promise.all([this.getProfiles(), this.getItems()]);
    this.activeProfileId = this.profilesList[0].id;
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
