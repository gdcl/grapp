//import Vuex from "vuex";
import { createStore } from "vuex";
import { storeConfig } from "../../../src/store/index.js";

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
    //  expect(sotre.state).toHaveProperty("items");
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

describe("store actions", () => {
  beforeEach(() => {
    store = createStore(storeConfig);
  });

  it("can get items from directus API  and update datastore", async () => {
    await store.dispatch("getItems");
    expect(store.state.items).not.toEqual({});
    const sNrs = ["1", "2", "3", "4", "5"];
    sNrs.forEach((item) => expect(store.state.items).toHaveProperty(item));
  });

  it("can authenticate successfully with correct credentials", async () => {
    await store.dispatch("login", {
      email: "testuser@test.org",
      password: "QaZVfRYhN@22",
    });
    expect(store.state.isLoggedIn).toEqual(true);
    expect(store.state.user).toEqual("testuser@test.org");
  });

  it("will not authenticate and provide an error when provided with incorrect credentials", async () => {
    await store.dispatch("login", {
      email: "nope@nope.org",
      password: "yeahnope",
    });
    expect(store.state.isLoggedIn).toEqual(false);
    expect(store.state.apiErrorMessages).not.toEqual([]);
    expect(store.state.user).toEqual("");
  });

  it("can log out successfully after login", async () => {
    await store.dispatch("login", {
      email: "testuser@test.org",
      password: "QaZVfRYhN@22",
    });
    await store.dispatch("logout");
    expect(store.state.isLoggedIn).toEqual(false);
    expect(store.state.user).toEqual("");
  });
});
