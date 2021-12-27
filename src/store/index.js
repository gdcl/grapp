import { createStore, createLogger } from "vuex";
import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export const state = () => {
  return {
    items: {},
    profiles: [],
    activeProfileId: 0,
    initializing: true,
    apiErrorMessages: [],
    isLoggedIn: false,
    user: "guy.duchatelet",
  };
};

export const debug = process.env.NODE_ENV === "development";
const plugins = debug ? [createLogger({})] : [];

export const storeConfig = {
  state,
  mutations,
  actions,
  getters,
  plugins,
};
export default createStore(storeConfig);
