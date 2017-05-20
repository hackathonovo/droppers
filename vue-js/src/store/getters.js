export default {
  isAuthenticated(state, getters) {
    return Boolean(getters.currentUser);
  },

  currentUser(state) {
    debugger;
    return state.session.user;
  }
};
