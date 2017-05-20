import Vue from 'vue';
import Vuex from 'vuex';


import apiAdapter from 'services/api-adapter';
import * as localStorage from 'services/local-storage';

import state from './state';
import mutations from './mutations';
import actionsGenerator from './actions';
import getters from './getters';

Vue.use(Vuex);

const actions = actionsGenerator({apiAdapter, localStorage});

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
