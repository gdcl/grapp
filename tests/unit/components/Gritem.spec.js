import { mount } from "@vue/test-utils";
import Vuex from "vuex";
import Gritem from "../../../src/components/Gritem.vue";

describe("Gritem.vue", () => {
  let getters;
  let actions;
  let store;
  let shoppingGritemMnt;
  let nonShoppingGritemMnt;

  beforeEach(() => {
    getters = {
      shoppingListProfile: () => 2,
    };

    actions = {
      increaseItem: jest.fn(),
      decreaseItem: jest.fn(),
      addItemToShoppingList: jest.fn(),
      deleteItem: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });

    nonShoppingGritemMnt = {
      global: {
        mocks: {
          $store: store,
        },
      },
      props: {
        item: {
          profile: getters.shoppingListProfile() - 1,
          name: "name",
          quantity: 5,
        },
      },
    };

    shoppingGritemMnt = {
      global: {
        mocks: {
          $store: store,
        },
      },
      props: {
        item: {
          profile: getters.shoppingListProfile(),
          name: "name",
          quantity: 5,
          unit: "testunit",
        },
      },
    };
  });

  it("renders a gritem when given a name and quantity", () => {
    const wrapper = mount(Gritem, nonShoppingGritemMnt);
    expect(wrapper.text()).toMatch("name: 5");
  });

  it("renders a gritem when given a name, quantity and testunit", () => {
    const wrapper = mount(Gritem, shoppingGritemMnt);

    expect(wrapper.text()).toMatch("name: 5 testunit");
  });

  it("calls increaseItem upon click of increase button", async () => {
    const wrapper = mount(Gritem, nonShoppingGritemMnt);

    const button = wrapper.get('[test-data="increase"]');
    await button.trigger("click");

    expect(actions.increaseItem).toHaveBeenCalled();
  });

  it("calls decreaseItem upon click of decrease button", async () => {
    const wrapper = mount(Gritem, nonShoppingGritemMnt);

    const button = wrapper.get('[test-data="decrease"]');
    await button.trigger("click");

    expect(actions.decreaseItem).toHaveBeenCalled();
  });

  it("shows the delete button only when item is in shoppingList", async () => {
    const wrapper = mount(Gritem, shoppingGritemMnt);

    expect(wrapper.find('[test-data="delete"').exists()).toBe(true);
  });

  it("does not show the delete button when item is not in the shoppingList", async () => {
    const wrapper = mount(Gritem, nonShoppingGritemMnt);

    expect(wrapper.find('[test-data="delete"').exists()).toBe(false);
  });

  it("shows the add to shopping list button only when item is not in shoppingList", async () => {
    const wrapper = mount(Gritem, nonShoppingGritemMnt);

    expect(wrapper.find('[test-data="shoppingList"').exists()).toBe(true);
  });

  it("does not show the add to shopping list button when item is in the shoppingList", async () => {
    const wrapper = mount(Gritem, shoppingGritemMnt);

    expect(wrapper.find('[test-data="shoppingList"').exists()).toBe(false);
  });

  it("calls addItemToShoppingList upon click of add item button if not in shopping list", async () => {
    const wrapper = mount(Gritem, nonShoppingGritemMnt);

    const button = wrapper.get('[test-data="shoppingList"]');
    await button.trigger("click");

    expect(actions.addItemToShoppingList).toHaveBeenCalled();
  });

  it("calls deleteItem upon click of delete button if item in shopping list", async () => {
    const wrapper = mount(Gritem, shoppingGritemMnt);

    const button = wrapper.get('[test-data="delete"]');
    await button.trigger("click");

    expect(actions.deleteItem).toHaveBeenCalled();
  });
});
