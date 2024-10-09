import { createApp } from 'vue';
import App from './App.vue';

import './assets/main.css';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

if (import.meta.env.DEV) {
  createApp(App).use(Buefy).mount('#app');
} else {
  window.ZOHO.embeddedApp.on('PageLoad', function (data) {
    createApp(App, { id: data }).use(Buefy).mount('#app');
  });
  window.ZOHO.embeddedApp.init();
}
