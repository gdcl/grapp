import { api, directusApi } from "../../src/api.js";
import fetch from "node-fetch";

let globals = {};
globals.testItem = {
  name: "jest_create_test",
  profile: 2,
  quantity: 15,
  unit: "kg",
};

beforeAll(() => {
  global.fetch = fetch;
});

afterAll(() => {
  console.log("afterAll");
});

describe("grapp API", () => {
  it("always exists and is a non null object", () => {
    expect(api).not.toBeNull();
    expect(api).toBeInstanceOf(Object);
  });
  it("has CRUD operations for item", () => {
    expect(api).toHaveProperty("getItemById");
    expect(api).toHaveProperty("createItem");
    expect(api).toHaveProperty("updateItem");
    expect(api).toHaveProperty("deleteItem");
  });

  it("can use getItems toget all 5 grocery items from the test-set", async () => {
    const items = await api.getItems();
    console.log(items);
    expect(items).toHaveProperty("data");
    expect(items.data).toHaveLength(5);
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

  it("can create a new item correctly", async () => {
    const item = await api.createItem(globals.testItem);
    globals.testItem.id = item.id;
    expect(item).toHaveProperty("data");
    expect(item.data).toBeInstanceOf(Object);
    expect(item.data.name).toEqual(globals.testItem.name);
    expect(item.data.profile).toEqual(globals.testItem.profile);
    expect(item.data.quantity).toEqual(globals.testItem.quantity);
    expect(item.data.unit).toEqual(globals.testItem.unit);
  });

  it("can delete an earlier created item correctly", async () => {
    await api.deleteItem(globals.testItem);
    const result = await api.getItemById(globals.testItem.id);
    expect(result).toHaveProperty("errors");
  });
});

describe("directus API", () => {
  it("always exist and is a non-null object", () => {
    expect(directusApi).not.toBeNull();
    expect(directusApi).toBeInstanceOf(Object);
  });
});
