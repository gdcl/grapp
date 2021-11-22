export default {
  createItem(state, payload) {
    // payload is full item
    state.items[payload.id] = payload;
  },

  createItems(state, payload) {
    // payload is list of items
    payload.forEach((item) => {
      state.items[item.id] = item;
    });
  },

  updateItem(state, payload) {
    // payload is full item
    state.items[payload.id] = payload;
  },
  deleteItem(state, payload) {
    // payload is item id
    delete state.items[payload];
  },

  createProfile(state, payload) {
    // payload is full item
    state.profiles.push(payload);
  },

  createProfiles(state, payload) {
    // payload is full item
    state.profiles = payload;
  },

  // updateProfile(state, payload) {
  //   // payload is full item
  //   const idx = state.profiles.findIndex((profile)=>profile ===payload.id);
  //   state.profiles.splice(idx,1,payload);
  // },
  deleteProfile(state, payload) {
    // payload is item id
    state.profiles = state.profiles.filter((profile) => profile.id !== payload);
  },

  setActiveProfileId(state, payload) {
    state.activeProfileId = payload;
  },

  setInitializing(state, _) {
    state.initializing = true;
    console.log(_);
  },

  clearInitializing(state, _) {
    state.initializing = false;
    console.log(_);
  },

  setApiError(state, payload) {
    state.apiErrorMessages = payload;
  },

  clearApiError(state, payload) {
    state.apiErrorMessages = [];
    console.log(payload);
  },

  login(state, _) {
    state.isLoggedIn = true;
    console.log(_);
  },

  logout(state, _) {
    state.isLoggedIn = false;
    console.log(_);
  },

  setUser(state, payload) {
    state.user = payload;
  },
};
