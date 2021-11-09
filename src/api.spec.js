import { api, directusApi } from "./api.js";
import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";
import sqlite3 from "sqlite3";

let db = null;

beforeAll(() => {
  console.log("beforeAll");
  return initializeGrappDatabase();
});

afterAll(() => {
  console.log("afterAll");
  return clearGrappDatabase();
});

function initializeGrappDatabase() {
  console.log("creating db connection");
  db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to SQlite database.");
  });
  //  return Promise.resolve("booyah");
}

function clearGrappDatabase() {
  db.close();
  //  return Promise.resolve("booyah");
}

describe("grapp API", () => {
  it("always exists and is a non null object", () => {
    expect(api).not.toBeNull();
    expect(api).toBeInstanceOf(Object);
  });
  it("has CRUD operations for item", () => {
    expect(api).toHaveProperty("createItem");
    expect(api).toHaveProperty("updateItem");
    expect(api).toHaveProperty("deleteItem");
  });
});

describe("directus API", () => {
  it("always exist and is a non-null object", () => {
    expect(directusApi).not.toBeNull();
    expect(directusApi).toBeInstanceOf(Object);
  });
});
