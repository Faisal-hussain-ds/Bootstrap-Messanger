import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import apiRequest from "../src/services/apiRequest";
import snackbar from "../src/services/snackbar";

createApp(App).use(store).use(router).use(apiRequest).use(snackbar).mount('#app')
