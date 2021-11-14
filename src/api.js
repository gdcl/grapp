import { Directus } from "@directus/sdk";

export function log(object) {
  if (typeof object === "object") {
    console.debug(JSON.stringify(object));
  } else {
    console.debug(object);
  }
}

const endpoint = process.env.VUE_APP_DIRECTUS_API + "items/grocery_items";

export const api = {
  // Basic CRUD
  createItem: async function(item) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const result = await response.json();
    return result;
  },

  updateItem: async function(item) {
    // log('api.updateItem')
    // log(item)
    const response = await fetch(`${endpoint}/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const result = await response.json();
    return result;
  },

  deleteItem: async function(item) {
    await fetch(`${endpoint}/${item.id}`, {
      method: "DELETE",
    });
  },

  getItemById: async function(id) {
    const response = await fetch(`${endpoint}/${id}`);
    const result = await response.json();
    return result;
  },

  //deprecated
  /*
    getItemByNameType: async function (name, type) {
        const response = await fetch(`${endpoint}?filter[name][_eq]=${name}&filter[item_type][_eq]=${type}`);
        return await (response.json());
    }, */

  getItems: async function() {
    const response = await fetch(endpoint, {
      method: "GET",
    });
    const result = await response.json();
    return result;
  },

  // Business logic

  addItem: async function(item, allItems) {
    const result = allItems.filter(
      (it) => it.profile.id === item.profile.id && it.name === item.name
    );
    if (result.length > 0) {
      const storedItem = result[0];
      const newQty = parseInt(storedItem.quantity) + parseInt(item.quantity);
      return await api.updateItem({ ...storedItem, quantity: newQty });
    } else {
      log("addItem: creating new item");
      log(item);
      return await api.createItem(item);
    }
  },

  increaseItem: async function(item) {
    item.quantity += 1;
    return await api.updateItem(item);
  },

  decreaseItem: async function(item) {
    item.quantity -= 1;
    if (item.quantity === 0) {
      return await api.deleteItem(item);
    } else {
      return await api.updateItem(item);
    }
  },

  selectItem: async function(item, allItems, currentProfileId) {
    if (item.profile.id !== currentProfileId) {
      const result = allItems.filter(
        (it) => it.name === item.name && it.profile.name === "current"
      );
      if (result.length > 0) {
        const storedItem = result[0];
        const newQty = storedItem.quantity + item.quantity;
        return await api.updateItem({ ...storedItem, quantity: newQty });
      } else {
        const newItem = { ...item };
        delete newItem.id;
        newItem.profile = { id: currentProfileId };
        return await api.addItem(newItem, allItems);
      }
    } else {
      return await api.deleteItem(item);
    }
  },
};

const directus = new Directus(process.env.VUE_APP_DIRECTUS_API);
export const directusApi = {
  async getItems() {
    const items = await directus.items("grocery_items").readMany({
      fields: ["id", "name", "quantity", "unit", "profile.id", "profile.name"],
    });
    return items;
  },

  async getProfiles() {
    const profiles = await directus.items("profile").readMany();
    return profiles;
  },

  async newProfile(profileName) {
    const profile = await directus.items("profile").createOne({
      name: profileName,
      user_id: "1",
    });
    return profile;
  },
};
