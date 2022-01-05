import { mount } from "@vue/test-utils";
import BaseCard from "../../../src/components/UI/BaseCard.vue";

describe("BaseCard.vue", () => {
  it("renders the header, main and footer slots", () => {
    const wrapper = mount(BaseCard, {
      props: {
        modal: true,
      },
      slots: {
        header: "header slot",
        default: "default slot",
        footer: "footer slot",
      },
    });

    const body = wrapper.find(".card-body");
    expect(body.text()).toMatch("default slot");

    const header = wrapper.find(".card-header");
    expect(header.text()).toMatch("header slot");

    const footer = wrapper.find(".card-footer");
    expect(footer.text()).toMatch("footer slot");
  });

  it("does not renders the footer when no footer slot is present", () => {
    const wrapper = mount(BaseCard, {
      props: {
        modal: true,
      },
      slots: {
        header: "header slot",
        default: "default slot",
      },
    });

    expect(wrapper.find(".card-footer").exists()).toBe(false);
  });
});
