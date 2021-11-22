<template>
  <div>
    <select @change="setActiveProfileId(parseInt($event.target.value))">
      ~
      <option
        v-for="prf in getProfilesStrict"
        :value="prf.id"
        :key="prf.id"
        :selected="prf.id === getActiveProfileId"
      >
        {{ prf.name }}
      </option>
    </select>
    <form @submit.prevent="createNewProfile">
      <button>Add new</button>
      <input type="text" name="newprofile" size="8" v-model.trim="newProfile" />
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      newProfile: "",
    };
  },
  computed: {
    ...mapGetters(["getProfilesStrict", "getActiveProfileId"]),
  },
  methods: {
    ...mapActions(["createProfile", "setActiveProfileId"]),
    createNewProfile() {
      this.createProfile({ name: this.newProfile, user_id: 1 });
    },
  },
};
</script>