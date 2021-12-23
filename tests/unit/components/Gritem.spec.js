import { mount } from "@vue/test-utils";
import Vuex from "vuex";
import Gritem from "../../../src/components/Gritem.vue";

describe("Gritem.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      shoppingListProfile: () => 2,
    };

    store = new Vuex.Store({
      getters,
    });
  });
  it("renders a gritem", () => {
    const wrapper = mount(Gritem, {
      global: {
        mocks: {
          $store: store,
        },
      },
      propsData: { item: { name: "name", quantity: 5, unit: "testunit" } },
    });

    console.log(wrapper.text());
    expect(wrapper.text()).toMatch("name: 5 testunit");
  });
});
