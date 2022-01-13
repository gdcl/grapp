import { createApp } from "vue";
import App from "./App.vue";
import BaseCard from "./components/UI/BaseCard.vue";
import BaseDialog from "./components/UI/BaseDialog.vue";
import store from "./store/index.js";
import router from './router'

createApp(App)
.use(router)
.use(store)
.component("BaseCard", BaseCard)
.component("BaseDialog", BaseDialog)
.mount("#app");
