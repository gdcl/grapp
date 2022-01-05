import { createApp } from "vue";
import Test from "./Test.vue";
import BaseCard from "../../src/components/UI/BaseCard.vue";
import BaseDialog from "../../src/components/UI/BaseDialog.vue";

const test = createApp(Test);
test.component("BaseCard", BaseCard);
test.component("BaseDialog", BaseDialog);
test.mount("#app");
