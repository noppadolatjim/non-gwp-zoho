import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'

import './assets/main.css';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

const pinia = createPinia()
if (import.meta.env.DEV) {
  createApp(App).use(Buefy).use(pinia).mount('#app');
} else {
  window.ZOHO.embeddedApp.on('PageLoad', function (data) {
    createApp(App, { id: data }).use(Buefy).use(pinia).mount('#app');
  });
  window.ZOHO.embeddedApp.init();
}
