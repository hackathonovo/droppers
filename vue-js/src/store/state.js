const state = {
  session: {
    isLoaded: false,
    isLoading: false,
    user: null,
    token: null
  },
  rescuers: {
    isLoaded: false,
    isLoading: false,
    data: []
  },
  currentRescuer: {
    data: {}
  },
  currentArea: {
    data: {}
  },
  actions: {
    isLoaded: false,
    isLoading: false,
    data: []
  },

  history: {
    isLoaded: false,
    isLoading: false,
    data: []
  }
};

export default state;
