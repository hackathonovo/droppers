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

  getRescuerDetails(state) {
    return state.rescuers.data[0]; // TODO find by something
  },

  isRescuersLoaded(state) {
    return state.rescuers.isLoaded;
  },

  isRescuersLoading(state) {
    return state.rescuers.isLoading;
  }
};
