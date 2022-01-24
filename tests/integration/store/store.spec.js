//import Vuex from "vuex";
import { createStore } from "vuex";
import { storeConfig } from "../../../src/store/index.js";
import { Directus } from "@directus/sdk";

let store;

let testItemCreate = {
  name: "jest_create_test1",
  profile: 2,
  quantity: 15,
  unit: "kg",
  id: 1,
};

let testItemUpdate = {
  name: "jest_create_test2",
  profile: 2,
  quantity: 15,
  unit: "kg",
  id: 1,
};

let testItemList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
  name: `jest${i}`,
  profile: i < 5 ? 1 : 2,
  quantity: 5,
  unit: "lbs",
  id: i,
}));

let testProfileCreate = { id: 10, name: "current" };
let testProfileList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
  name: `jest${i}`,
  id: i,
}));

describe("store mutations for items", () => {
  beforeEach(() => {
    store = createStore(storeConfig);
    store.commit("createItem", testItemCreate);
  });

  it("can create an item with createItem", () => {
    //    expect(store.state).toHaveProperty("items");
    //    expect(store.state.items).toHaveProperty(testItemCreate.id.toString());
    expect(store.state.items[testItemCreate.id]).toEqual(testItemCreate);
  });

  it("can update an item with updateItem", () => {
    store.commit("updateItem", testItemUpdate);
    //  expect(testState).toHaveProperty("items");
    //  expect(testState.items).toHaveProperty(testItem.id.toString());
    expect(store.state.items[testItemUpdate.id]).toEqual(testItemUpdate);
  });

  it("can delete an item with deleteItem", () => {
    store.commit("deleteItem", testItemCreate.id);
    //  expect(store.state).toHaveProperty("items");
    expect(store.state.items).not.toHaveProperty(testItemCreate.id.toString());
  });
});

describe("store getters for items", () => {
  beforeEach(() => {
    store = createStore(storeConfig);
    testItemList.forEach((item) => store.commit("createItem", item));
  });

  it("can get an individual item with getItem", () => {
    testItemList.forEach((item) =>
      expect(store.getters.getItem(item.id)).toEqual(item)
    );
  });

  it("can filter items by Profile with getItemsByProfile", () => {
    expect(store.getters.getItemsByProfile(1)).toHaveLength(5);
    const expected = testItemList.filter((i) => i.id < 5);
    expect(store.getters.getItemsByProfile(1)).toStrictEqual(expected);
  });
});

describe("store mutations for profiles", () => {
  beforeEach(() => {
    store = createStore(storeConfig);
    store.commit("createProfile", testProfileCreate);
  });

  it("can create an profile with createProfile", () => {
    //    expect(store.state).toHaveProperty("profiles");
    //    expect(store.state.profiles).toHaveProperty(testProfileCreate.id.toString());
    expect(store.state.profiles).toContainEqual(testProfileCreate);
  });

  // it("can update an profile with updateProfile", () => {
  //   store.commit("updateProfile", testProfileUpdate);
  //   //  expect(testState).toHaveProperty("profiles");
  //   //  expect(testState.profiles).toHaveProperty(testProfile.id.toString());
  //   expect(store.state.profiles[testProfileUpdate.id]).toEqual(testProfileUpdate);
  // });

  it("can delete a profile with deleteProfile", () => {
    store.commit("deleteProfile", testProfileCreate.id);
    //  expect(store.state).toHaveProperty("profiles");
    expect(store.state.profiles).not.toContainEqual(testProfileCreate);
  });
});

describe("store getters for profiles", () => {
  beforeEach(() => {
    store = createStore(storeConfig);
    testProfileList.forEach((profile) =>
      store.commit("createProfile", profile)
    );
    store.commit("createProfile", testProfileCreate);
  });

  it("can get an individual profile with getProfileByName", () => {
    testProfileList.forEach((profile) =>
      expect(store.getters.getProfileByName(profile.name)).toEqual(profile.id)
    );
  });

  it("can get the shopping list profile by name", () => {
    expect(store.getters.getProfileByName("current")).toEqual(10);
  });
});

describe("store actions - authentication", () => {
  beforeEach(() => {
    store = createStore(storeConfig);
  });

  it("can authenticate successfully with correct credentials", async () => {
    await store.dispatch("login", {
      email: "testuser@test.org",
      password: "QaZVfRYhN@22",
    });
    expect(store.state.isLoggedIn).toEqual(true);
    expect(store.state.user.email).toEqual("testuser@test.org");
  });

  it("will not authenticate and provide an error when provided with incorrect credentials", async () => {
    await store.dispatch("login", {
      email: "nope@nope.org",
      password: "yeahnope",
    });
    expect(store.state.isLoggedIn).toEqual(false);
    expect(store.state.apiErrorMessages).not.toEqual([]);
    expect(store.state.user).toEqual({});
  });

  it("can log out successfully after login", async () => {
    await store.dispatch("login", {
      email: "testuser@test.org",
      password: "QaZVfRYhN@22",
    });
    await store.dispatch("logout");
    expect(store.state.isLoggedIn).toEqual(false);
    expect(store.state.user).toEqual({});
  });
});

describe("store actions - authenticated crud on profiles and items", () => {
  beforeEach(async () => {
    store = createStore(storeConfig);
    await store.dispatch("login", {
      email: "testuser@test.org",
      password: "QaZVfRYhN@22",
    });
  });

  it("can get items from directus API and update datastore", async () => {
    await store.dispatch("getItems");
    expect(store.state.items).not.toEqual({});
    const sNrs = ["1", "2", "3", "4", "5"];
    sNrs.forEach((item) => expect(store.state.items).toHaveProperty(item));
  });

  it("can create profiles through the directus API and update datastore", async () => {
    await store.dispatch("createProfile", "test-create-profile");
    expect(store.state.activeProfileId).not.toBe(0);
    const created = store.state.profiles.find(
      (p) => p.name === "test-create-profile"
    );
    expect(created).not.toBeUndefined();
    expect(created.user).toEqual(store.state.user.id);
  });

  it("can create grocery items through the directus API  and update datastore", async () => {
    await store.dispatch("createItem", {
      name: "testitem",
      quantity: 3,
      unit: "unit",
      profile: 2,
      user: "33eb64ec-a4b3-4221-b7e4-a915977d1148",
    });
    const items = store.getters.getItems;
    const created = items.find((i) => i.name === "testitem");
    expect(created).not.toBeUndefined();
    expect(created.name).toEqual("testitem");
    expect(created.quantity).toEqual(3);
    expect(created.unit).toEqual("unit");
    expect(created.profile).toEqual(2);
    expect(created.user).toEqual("33eb64ec-a4b3-4221-b7e4-a915977d1148");
  });
});

describe("store actions - security, authentication", () => {
  beforeEach(async () => {
    store = createStore(storeConfig);
    await store.dispatch("logout");
  });

  it("can log out", () => {
    expect(store.state.items).toEqual({});
    expect(store.getters.isLoggedIn).toEqual(false);
  });

  it("will fail to get items and log an exception if unauthenticated", async () => {
    await store.dispatch("getItems");
    expect(store.state.items).toEqual({});
    expect(store.state.apiErrorMessages).not.toEqual([]);
  });

  it("will fail to create profiles and log an exception if unauthenticated", async () => {
    await store.dispatch("createProfile", "test-create-profile");
    expect(store.state.activeProfileId).toBe(0);
    const created = store.state.profiles.find(
      (p) => p.name === "test-create-profile"
    );
    expect(created).toBeUndefined();
    expect(store.state.apiErrorMessages).not.toEqual([]);
  });

  it("will fail to create grocery items and log an exception if unauthenticated", async () => {
    await store.dispatch("createItem", {
      name: "testitem",
      quantity: 3,
      unit: "unit",
      profile: 2,
      user: "33eb64ec-a4b3-4221-b7e4-a915977d1148",
    });
    const items = store.getters.getItems;
    const created = items.find((i) => i.name === "testitem");
    expect(created).toBeUndefined();
    expect(store.state.apiErrorMessages).not.toEqual([]);
  });
});
describe("store actions - user management", () => {
  beforeEach(async () => {
    const directus = new Directus(process.env.VUE_APP_DIRECTUS_API);
    await directus.auth.login({
      email: "admin@grapp.org",
      password: "QaZVfRYhN@22",
    });
    const testuser = await directus.users.readMany({
      filter: { email: { _eq: "first.last@test.com" } },
      fields: ["id"],
    });
    if (testuser && testuser.data.length > 0) {
      const userId = testuser.data[0].id;
      await directus.users.deleteOne(userId);
    }
    await directus.auth.logout();
    store = createStore(storeConfig);
    await store.dispatch("logout");
  });

  it("can register a new user successfully once, but not twice", async () => {
    const result = await store.dispatch("createUser", {
      first: "TestFirst",
      last: "TestLast",
      email: "first.last@test.com",
      password: "75069Texas",
    });

    expect(result).toEqual("first.last@test.com");
    await store.dispatch("login", {
      email: "first.last@test.com",
      password: "75069Texas",
    });
    expect(store.state.isLoggedIn).toEqual(true);
    expect(store.state.user.email).toEqual("first.last@test.com");

    await store.logout;
    const result2 = store.dispatch("createUser", {
      first: "TestFirst",
      last: "TestLast",
      email: "first.last@test.com",
      password: "75069Texas",
    });
    expect(result2).rejects.toThrow("his email address is already registered.");
  });
});
