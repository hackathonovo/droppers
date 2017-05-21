export default {
  isAuthenticated(state, getters) {
    return Boolean(getters.currentUser);
  },

  currentUser(state) {
    return state.session.user;
  },

  rescuers(state) {
    return state.rescuers.data;
  },

  isRescuersLoaded(state) {
    return state.rescuers.isLoaded;
  },

  isRescuersLoading(state) {
    return state.rescuers.isLoading;
  },

  getRescuerDetails(state) {
    return state.currentRescuer.data;
  },

  actions(state) {
    return state.actions.data;
  },

  isActionsLoaded(state) {
    return state.actions.isLoaded;
  },

  isActionsLoading(state) {
    return state.actions.isLoading;
  },

  history(state) {
    return state.history.data;
  },

  isHistoryLoaded(state) {
    return state.history.isLoaded;
  },

  isHistoryLoading(state) {
    return state.history.isLoading;
  }
};
