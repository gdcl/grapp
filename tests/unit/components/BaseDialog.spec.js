import { mount } from "@vue/test-utils";
import BaseDialog from "../../../src/components/UI/BaseDialog.vue";
import BaseCard from "../../../src/components/UI/BaseCard.vue";

describe("BaseDialog.vue", () => {
  it("renders the dialogTitle, body and footer slots", () => {
    const wrapper = mount(BaseDialog, {
      props: {
        open: true,
      },
      slots: {
        dialogTitle: "dialog title",
        dialogBody: "dialog body",
        dialogFooter: "dialog footer",
      },
      components: {
        BaseCard,
      },
    });

    const body = wrapper.find(".card-body");
    expect(body.text()).toMatch("dialog body");

    const header = wrapper.find(".card-header");
    expect(header.text()).toMatch("dialog title");

    const footer = wrapper.find(".card-footer");
    expect(footer.text()).toMatch("dialog footer");
  });
});
