export default {
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
   return state.profiles.filter((profile)=> profile.name !== "current") 
 },

  getProfileByName(state) {
    return (name) => {
      return state.profiles.filter((profile) => profile.name === name)[0].id;
    };
  },

  shoppingListProfile(state, getters) {
    return getters.getProfileByName("current");
  },

  apiErrors(state) {
    return state.apiErrorMessages && state.apiErrorMessages.length > 0;
  },
};
