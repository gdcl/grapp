import { Directus } from "@directus/sdk";

const directus = new Directus(process.env.VUE_APP_DIRECTUS_API);
const gritems = directus.items("grocery_items");
const profile = directus.items("profile");

// Helper methods to call on directus APIs
async function handleError(err, context) {
  let errorMessages = [];
  if (err instanceof Error) {
    errorMessages.push(err.toString());
  } else {
    errorMessages = err["errors"];
  }
  await context.commit("setApiError", errorMessages);
}

async function invoke(apiPromise, mutation, context, optional_payload) {
  try {
    const items = await apiPromise;
    if (items && "errors" in items) {
      await handleError(items, context);
    } else {
      const payload = optional_payload
        ? optional_payload
        : "data" in items
        ? items["data"]
        : items;
      await context.commit(mutation, payload);
      if (context.getters.apiErrors) {
        context.commit("clearApiError");
      }
    }
  } catch (error) {
    await handleError(error, context);
  }
}

async function addItemHelper(context, { action, payload }) {
  const item = payload;
  const result = context.getters.getItems.filter(
    (itm) =>
      itm.profile === item.profile &&
      itm.name === item.name &&
      itm.unit === item.unit
  );
  if (result.length > 0) {
    const storedItem = result[0];
    const newQty = storedItem.quantity + item.quantity;
    context.dispatch("updateItem", { ...storedItem, quantity: newQty });
  } else {
    context.dispatch(action, item);
  }
}

export default {
  async checkAuth(context) {
    try {
      const me = await directus.users.me.read();
      context.commit("login", me);
    } catch (error) {
      context.commit("logout");
      handleError(error, context);
    }
  },

  async login(context, payload) {
    //payload is email, password object
    try {
      await directus.auth.login(payload);
      const me = await directus.users.me.read();
      context.commit("login", me);
    } catch (error) {
      context.commit("logout");
      handleError(error, context);
    }
  },

  async logout(context) {
    //payload is email, password object
    try {
      await directus.auth.logout();
      context.commit("logout");
    } catch (error) {
      handleError(error, context);
    }
  },

  async createUser(context, payload) {
    try {
      const roles = await directus.roles.readMany({
        filter: { name: { _eq: "AppUser" } },
        fields: ["id"],
      });
      const roleId = roles.data[0].id;
      payload = { ...payload, role: roleId };
      const user = await directus.users.createOne(payload);
      return Promise.resolve(user.email);
    } catch (error) {
      if (error.toString().includes('"email" has to be unique.')) {
        return Promise.reject(`This email address is already registered.`);
      } else {
        return Promise.reject(`This user could not be registered [${error}]`);
      }
    }
  },

  async getItems(context) {
    try {
      const apiCall = gritems.readMany({
        fields: ["id", "name", "quantity", "unit", "profile", "user"],
      });
      const mutation = "createItems";

      await invoke(apiCall, mutation, context);
    } catch (err) {
      handleError(err, context);
    }
  },

  async createItem(context, payload) {
    try {
      payload = { ...payload, user: context.getters.getUserId };
      const apiCall = gritems.createOne(payload);
      const mutation = "createItem";

      await invoke(apiCall, mutation, context);
    } catch (err) {
      handleError(err, context);
    }
  },

  async deleteItem(context, payload) {
    // payload it item id
    try {
      const apiCall = gritems.deleteOne(payload);
      const mutation = "deleteItem";

      await invoke(apiCall, mutation, context, payload);
    } catch (err) {
      handleError(err);
    }
  },

  async updateItem(context, payload) {
    try {
      const apiCall = gritems.updateOne(payload.id, payload);
      const mutation = "updateItem";

      await invoke(apiCall, mutation, context);
    } catch (err) {
      handleError(err, context);
    }
  },

  async increaseItem(context, payload) {
    payload.quantity++;
    context.dispatch("updateItem", payload);
  },

  async decreaseItem(context, payload) {
    payload.quantity--;
    if (payload.quantity === 0) {
      context.dispatch("deleteItem", payload.id);
    } else {
      context.dispatch("updateItem", payload);
    }
  },

  async addItem(context, payload) {
    addItemHelper(context, { action: "createItem", payload: payload });
  },

  async moveItem(context, { item, profile }) {
    let movedItem = { ...item };
    movedItem.profile = profile;
    addItemHelper(context, { action: "updateItem", payload: movedItem });
    return;
  },

  async addItemToShoppingList(context, item) {
    let addedItem = { ...item };
    addedItem.profile = context.getters.shoppingListProfile;
    delete addedItem.id;
    context.dispatch("addItem", addedItem);
  },

  async getProfiles(context) {
    try {
      const apiCall = profile.readMany();
      const mutation = "createProfiles";
      await invoke(apiCall, mutation, context);
    } catch (err) {
      handleError(err, context);
    }
  },

  setActiveProfileId(context, payload) {
    context.commit("setActiveProfileId", payload);
  },

  async createProfile(context, payload) {
    try {
      const newProfile = {
        name: payload,
        user: context.getters.getUserId,
      };
      const result = await profile.createOne(newProfile);
      if (result && "errors" in result) {
        await handleError(result, context);
      } else {
        await context.commit("createProfile", result);
        await context.commit("setActiveProfileId", result.id);
        if (context.getters.apiErrors) {
          await context.commit("clearApiError");
        }
      }
    } catch (err) {
      handleError(err, context);
    }
  },

  async initializeUserProfiles(context, payload) {
    try {
      return Promise.resolve(payload.email);
    } catch (error) {
      return Promise.reject(`This user could not be registered. ${error}`);
    }
  },

  async bootStrapStore(context) {
    await Promise.all([
      context.dispatch("getItems"),
      context.dispatch("getProfiles"),
    ]);

    if (!context.getters.shoppingListProfile) {
      await Promise.all([
        context.dispatch("createProfile", "current"),
        context.dispatch("createProfile", "Initial"),
      ]);
    }

    const strictProfiles = context.getters.getProfilesStrict;
    const firstProfileId = strictProfiles.length > 0 ? strictProfiles[0].id : 0;
    await context.commit("setActiveProfileId", firstProfileId);
    await context.commit("clearInitializing");
  },
};
