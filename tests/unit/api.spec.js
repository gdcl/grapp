/**
 * @jest-environment node
 */
import { api, directusApi } from "../../src/api.js";
import fetch from "node-fetch";

let globals = {
  testItem: {
    name: "jest_create_test",
    profile: 2,
    quantity: 15,
    unit: "kg",
  },
  createdItem: {},
};

beforeAll(() => {
  global.fetch = fetch;
});

afterAll(() => {
  console.log("afterAll");
});

describe("directus API", () => {
  it("always exist and is a non-null object", () => {
    expect(directusApi).not.toBeNull();
    expect(directusApi).toBeInstanceOf(Object);
  });

  it("can use getItems to get all 5 grocery items from the test-set", async () => {
    const items = await directusApi.getItems();
    expect(items).toHaveProperty("data");
    expect(items.data.length).toBeGreaterThanOrEqual(5);
    items.data.forEach((item, index) =>
      expect(item).toEqual({
        id: index + 1,
        name: `name${index + 1}`,
        profile: { id: 2, name: "jest" },
        quantity: `quantity${index + 1}`,
        unit: `unit${index + 1}`,
      })
    );
  });
});

describe("read use cases: grapp API", () => {
  it("always exists and is a non null object", () => {
    expect(api).not.toBeNull();
    expect(api).toBeInstanceOf(Object);
  });
  it("has CRUD operations for item", () => {
    expect(api).toHaveProperty("createItem");
    expect(api).toHaveProperty("deleteItem");
    expect(api).toHaveProperty("getItemById");
    expect(api).toHaveProperty("updateItem");
  });
  it("can use getItems toget all 5 grocery items from the test-set", async () => {
    const items = await api.getItems();
    console.log(items);
    expect(items).toHaveProperty("data");
    expect(items.data.length).toBeGreaterThanOrEqual(5);
    items.data.forEach((item, index) =>
    expect(item).toEqual({
        id: index + 1,
        item_type: "dc",
        name: `name${index + 1}`,
        profile: 2,
        quantity: `quantity${index + 1}`,
        unit: `unit${index + 1}`,
      })
    );
    
  });

  it("can getItemById correctly", async () => {
    for (let i = 1; i <= 5; i++) {
      const item = await api.getItemById(i);
      expect(item).toHaveProperty("data");
      expect(item.data).toEqual({
        id: i,
        item_type: "dc",
        name: `name${i}`,
        profile: 2,
        quantity: `quantity${i}`,
        unit: `unit${i}`,
      });
    }
  });
});

describe("create and update use cases: grapp API", () => {
  beforeEach(async () => {
    const item = await api.createItem(globals.testItem);
    expect(item).toHaveProperty("data");
    expect(item.data).toBeInstanceOf(Object);
    globals.createdItem = { ...item.data };
  });

  it("can create a new item correctly", async () => {
    const item = { ...globals.createdItem };
    expect(item.name).toEqual(globals.testItem.name);
    expect(item.profile).toEqual(globals.testItem.profile);
    expect(item.quantity).toEqual(globals.testItem.quantity);
    expect(item.unit).toEqual(globals.testItem.unit);
  });

  it("can update a new item correctly", async () => {
    let testItem = { ...globals.createdItem };
    testItem.name = "newName";
    testItem.unit = "newUnit";
    testItem.quantity = 99;
    const result = await api.updateItem(testItem);
    expect(result).toHaveProperty("data");
    expect(result.data).toEqual(testItem);
  });

  it("can delete an earlier created item correctly", async () => {
    await api.deleteItem(globals.createdItem);
    const result = await api.getItemById(globals.createdItem.id);
    expect(result).toHaveProperty("errors");
  });
});
