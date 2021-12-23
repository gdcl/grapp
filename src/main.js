import { createApp } from "vue";
import App from "./App.vue";
import BaseCard from "./components/UI/BaseCard.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";
import store from "./store/index.js";

const app = createApp(App);
app.use(store);
app.component("BaseCard", BaseCard);
app.component("BaseDialog", BaseDialog);
app.mount("#app");
