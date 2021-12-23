<template>
  <h1>Profile</h1>
  <select @change="updateProfile(parseInt($event.target.value))">
    ~
    <option
      v-for="prf in getProfilesStrict"
      :value="prf.id"
      :key="prf.id"
      :selected="prf.id === getActiveProfileId"
    >
      {{ prf.name }}
    </option>
    <option
      :value="-1"
      :key="-1"
    >
      -- Make New --
    </option>
  </select>
  <form
    v-if="createNew"
    @submit.prevent="createNewProfile"
  >
    New profile:
    <input
      type="text"
      placeholder="name"
      name="newprofile"
      size="20"
      v-model.trim="newProfile"
    >
    <button>New Profile</button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      createNew: false,
      newProfile: "",
    };
  },
  computed: {
    ...mapGetters(["getProfilesStrict", "getActiveProfileId"]),
  },
  methods: {
    ...mapActions(["createProfile", "setActiveProfileId"]),

    updateProfile(profile_id) {
      if (profile_id === -1) {
        this.createNew = true;
      } else {
        this.setActiveProfileId(profile_id);
        this.createNew = false;
      }
    },

    createNewProfile() {
      this.createProfile({ name: this.newProfile, user_id: 1 });
      this.createNew = false;
    },
  },
};
</script>
<style scoped>
/* form {
  display: inline;
} */

h1 {
  display: inline;
  vertical-align: middle;
}
select {
  background: #ffffff;
  border: solid 1px #d0d7de;
  border-radius: 4px;
  padding: 5px 2px 5px 5px;
  margin: 1px 5px 1px 8px;
  vertical-align: middle;
  box-sizing: border-box;
  height: 30px;

}
</style>