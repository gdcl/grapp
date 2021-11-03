import { createApp } from 'vue'
import App from './App.vue'
import BaseCard from './components/UI/BaseCard.vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


const app = createApp(App);
app.component('base-card', BaseCard);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount('#app');
