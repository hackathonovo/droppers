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
  },

  // RESCUERS DETAILS MUTATIONS

  [mutationTypes.RESCUERS_DETAIL_REQUEST](state) {
    state.rescuers.isLoading = true;
  },

  [mutationTypes.RESCUERS_DETAIL_SUCCESS](state) {
    state.rescuers.isLoaded = true;
    state.rescuers.isLoading = false;
  },

  [mutationTypes.RESCUERS_DETAIL_EDIT](state, data) {
    state.currentRescuer.data = data;
  },

  [mutationTypes.RESCUERS_DETAIL_FAILURE](state) {
    state.rescuers.isLoading = false;
    state.rescuers.isLoaded = false;
  },

  [mutationTypes.RESCUERS_DETAIL_SET](state, id) {
    state.currentRescuer.data = state.rescuers.data.find((res) => {
      return res.id === id;
    });
  },

  [mutationTypes.AREA_DETAIL_SET](state, data) {
    state.currentArea.data = data;
  },

  // ACTIONS MUTATIONS

  [mutationTypes.ACTIONS_REQUEST](state) {
    state.actions.isLoading = true;
  },

  [mutationTypes.ACTIONS_SUCCESS](state, data) {
    state.actions.data = data;
    state.actions.isLoaded = true;
    state.actions.isLoading = false;
  },

  [mutationTypes.ACTIONS_FAILURE](state) {
    state.actions.isLoading = false;
    state.actions.isLoaded = false;
  },
  // history MUTATIONS

  [mutationTypes.HISTORY_REQUEST](state) {
    state.history.isLoading = true;
  },

  [mutationTypes.HISTORY_SUCCESS](state, data) {
    state.history.data = data;
    state.history.isLoaded = true;
    state.history.isLoading = false;
  },

  [mutationTypes.HISTORY_FAILURE](state) {
    state.history.isLoading = false;
    state.history.isLoaded = false;
  },

  [mutationTypes.RESCUE_FINISH](state, data) {
    state.rescue.finished.finishNotes = data.finishNotes;
    state.rescue.finished.rescueId = data.rescueId;
  },
};
