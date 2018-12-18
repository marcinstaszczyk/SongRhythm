import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import Modal from './components/core/Modal.vue';
import { VueDialogPlugin } from './components/core/vue-dialog-plugin';


Vue.config.productionTip = false;

Vue.component('Modal', Modal);
Vue.use(VueDialogPlugin);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
