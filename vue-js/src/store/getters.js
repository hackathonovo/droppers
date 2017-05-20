export default {
  isAuthenticated(state, getters) {
    return Boolean(getters.currentUser);
  },

  currentUser(state) {
    return state.session.user;
  }
};
