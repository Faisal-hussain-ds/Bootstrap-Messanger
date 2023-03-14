import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import apiRequest from "../src/services/apiRequest";
import snackbar from "../src/services/snackbar";
import { Quasar , Notify} from 'quasar'
import quasarUserOptions from './quasar-user-options'

createApp(App) .use(Quasar, {
    ...quasarUserOptions,
    plugins: {
      Notify,
    },
  }).use(store).use(router).use(apiRequest).use(snackbar).mount('#app')
