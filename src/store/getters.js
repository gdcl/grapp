export default {
  isLoggedIn(state) {
    return state.isLoggedIn;
  },

  getUser(state) {
    return state.user.email;
  },

  getUserId(state) {
    return state.user.id;
  },

  getItem(state) {
    return (id) => {
      return state.items[id];
    };
  },

  getItems(state) {
    return Object.values(state.items);
  },

  getItemsByProfile(state) {
    return (id) => {
      return Object.values(state.items).filter((item) => item.profile === id);
    };
  },

  getActiveProfileId(state) {
    return state.activeProfileId;
  },

  getProfilesStrict(state) {
    return state.profiles.filter((profile) => profile.name !== "current");
  },

  getProfileByName(state) {
    return (name) => {
      const profile = state.profiles.filter(
        (profile) => profile.name === name
      )[0];
      return profile ? profile.id : 0;
    };
  },

  shoppingListProfile(state, getters) {
    return getters.getProfileByName("current");
  },

  initalListProfile(state, getters) {
    return getters.getProfileByName("Initial");
  },

  shoppingListItems(state, getters) {
    return getters.getItemsByProfile(getters.shoppingListProfile);
  },

  apiErrors(state) {
    return state.apiErrorMessages && state.apiErrorMessages.length > 0;
  },
};
