import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';

import router from 'router';
import store from 'store';

import Application from 'components/Application';
import 'application.scss';

Vue.use(VueRouter);
Vue.use(VueMaterial);


const APP_CONTAINER_ID = 'app';
const appContainer = document.getElementById(APP_CONTAINER_ID);

if (appContainer) {
  new Vue({ // eslint-disable-line no-new
    el: appContainer,
    render: (renderFunc) => renderFunc(Application),
    router,
    store,
    data() {
      return {};
    }
  });
}
