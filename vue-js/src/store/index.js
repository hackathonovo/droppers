import Vue from 'vue';
import Vuex from 'vuex';


import apiAdapter from 'services/api-adapter';
import * as localStorage from 'services/local-storage';

import state from 'store/state';
import mutations from 'store/mutations';
import actionsGenerator from 'store/actions';
import getters from 'store/getters';


Vue.use(Vuex);

const actions = actionsGenerator({apiAdapter, localStorage});

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
