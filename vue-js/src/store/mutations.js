import apiAdapter from 'services/api-adapter';
import * as localStorage from 'services/local-storage';
import * as mutationTypes from 'store/mutation-types';

export default {
  [mutationTypes.SESSION_REQUEST](state) {
    state.session.isLoading = true;
  },

  [mutationTypes.SESSION_SUCCESS](state, {user, token}) {
    state.session.isLoading = false;
    state.session.isLoaded = true;
    state.session.user = user;
    state.session.token = token;

    localStorage.setItem('api-token', token);
    apiAdapter.setToken(token);
  },

  [mutationTypes.SESSION_FAILURE](state) {
    state.session.isLoading = false;
    state.session.isLoaded = true;
  },

  [mutationTypes.SESSION_DESTROY](state) {
    state.session.user = null;
    state.session.token = '';
  },

  [mutationTypes.UNAUTHENTICATED_REQUEST](state, pathName) {
    state.session.nextPathName = pathName;
  },

  // RESCUERS MUTATIONS

  [mutationTypes.RESCUERS_REQUEST](state) {
    state.rescuers.isLoading = true;
  },

  [mutationTypes.RESCUERS_SUCCESS](state, data) {
    state.rescuers.data = data;
    state.rescuers.isLoaded = true;
    state.rescuers.isLoading = false;
  },

  [mutationTypes.RESCUERS_FAILURE](state) {
    state.rescuers.isLoading = false;
    state.rescuers.isLoaded = false;
  }

};
