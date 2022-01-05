import { mount } from "@vue/test-utils";
import Vuex from "vuex";
import ShareForm from "../../../src/components/ShareForm.vue";
import BaseDialog from "../../../src/components/UI/BaseDialog.vue";
import BaseCard from "../../../src/components/UI/BaseDialog.vue";

describe("ShareForm.vue", () => {
  let getters;
  let $store;
  let shareFormMnt;

  let testItemList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({
    name: `jest${i}`,
    profile: 1,
    quantity: 5,
    unit: "lbs",
    id: i,
  }));

  beforeEach(() => {
    // create teleport target
    const el = document.createElement("div");
    el.id = "app";
    document.body.appendChild(el);

    getters = {
      shoppingListItems: () => testItemList,
    };

    // actions = {
    //   increaseItem: jest.fn(),
    //   decreaseItem: jest.fn(),
    //   addItemToShoppingList: jest.fn(),
    //   deleteItem: jest.fn(),
    // };

    $store = new Vuex.Store({
      getters,
      // actions,
    });

    shareFormMnt = {
      global: {
        mocks: {
          $store,
        },
        components: {
          BaseCard,
          BaseDialog,
        },
      },
      props: {
        open: true,
      },
    };
  });

  afterEach(() => {
    // clean up
    document.body.outerHTML = "";
  });

  it("renders a ShareForm", () => {
    const wrapper = mount(ShareForm, shareFormMnt);
    console.log(wrapper.html())
    const dialog = wrapper.getComponent(BaseDialog);
    console.log(dialog.html());
    const footer = dialog.get(".card-footer");
    expect(footer.text()).toMatch("text");
  });

  // it("renders a gritem when given a name, quantity and testunit", () => {
  //   const wrapper = mount(Gritem, shoppingGritemMnt);

  //   expect(wrapper.text()).toMatch("name: 5 testunit");
  // });

  // it("calls increaseItem upon click of increase button", async () => {
  //   const wrapper = mount(Gritem, nonShoppingGritemMnt);

  //   const button = wrapper.get('[test-data="increase"]');
  //   await button.trigger("click");

  //   expect(actions.increaseItem).toHaveBeenCalled();
  // });

  // it("calls decreaseItem upon click of decrease button", async () => {
  //   const wrapper = mount(Gritem, nonShoppingGritemMnt);

  //   const button = wrapper.get('[test-data="decrease"]');
  //   await button.trigger("click");

  //   expect(actions.decreaseItem).toHaveBeenCalled();
  // });

  // it("shows the delete button only when item is in shoppingList", async () => {
  //   const wrapper = mount(Gritem, shoppingGritemMnt);

  //   expect(wrapper.find('[test-data="delete"').exists()).toBe(true);
  // });

  // it("does not show the delete button when item is not in the shoppingList", async () => {
  //   const wrapper = mount(Gritem, nonShoppingGritemMnt);

  //   expect(wrapper.find('[test-data="delete"').exists()).toBe(false);
  // });

  // it("shows the add to shopping list button only when item is not in shoppingList", async () => {
  //   const wrapper = mount(Gritem, nonShoppingGritemMnt);

  //   expect(wrapper.find('[test-data="shoppingList"').exists()).toBe(true);
  // });

  // it("does not show the add to shopping list button when item is in the shoppingList", async () => {
  //   const wrapper = mount(Gritem, shoppingGritemMnt);

  //   expect(wrapper.find('[test-data="shoppingList"').exists()).toBe(false);
  // });

  // it("calls addItemToShoppingList upon click of add item button if not in shopping list", async () => {
  //   const wrapper = mount(Gritem, nonShoppingGritemMnt);

  //   const button = wrapper.get('[test-data="shoppingList"]');
  //   await button.trigger("click");

  //   expect(actions.addItemToShoppingList).toHaveBeenCalled();
  // });

  // it("calls deleteItem upon click of delete button if item in shopping list", async () => {
  //   const wrapper = mount(Gritem, shoppingGritemMnt);

  //   const button = wrapper.get('[test-data="delete"]');
  //   await button.trigger("click");

  //   expect(actions.deleteItem).toHaveBeenCalled();
  // });
});
