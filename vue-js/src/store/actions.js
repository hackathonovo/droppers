import * as mutationTypes from 'store/mutation-types';

export default function({apiAdapter, localStorage}) {
  return {
    login({commit}, {username, password}) {
      commit(mutationTypes.SESSION_REQUEST);
      return apiAdapter.login({
        username, password
      }).then(({user, token}) => {
        commit(mutationTypes.SESSION_SUCCESS, {
          user,
          token
        });
      }).catch((error) => {
        commit(mutationTypes.SESSION_FAILURE);
        throw error;
      });
    },

    checkSession({commit}) {
      const token = localStorage.getItem('api-token');
      if (token) {
        commit(mutationTypes.SESSION_REQUEST);
        apiAdapter.setToken(token);
        return apiAdapter.currentUser()
        .then(({data}) => {
          commit(mutationTypes.SESSION_SUCCESS, {
            user: data,
            token
          });
        }).catch((error) => {
          commit(mutationTypes.SESSION_FAILURE);
          throw error;
        });
      }
      return Promise.reject();
    },

    logout({commit}) {
      localStorage.removeItem('api-token');
      commit(mutationTypes.SESSION_DESTROY);
    },

    fetchRescuers({state, commit}) {
      if (state.rescuers.data.length) {
        return;
      }
      commit(mutationTypes.RESCUERS_REQUEST);
      apiAdapter.fetchRescuers().then((data) => {
        commit(mutationTypes.RESCUERS_SUCCESS, data);
      }).catch((error) => {
        commit(mutationTypes.RESCUERS_FAILURE);
        throw error;
      });
    },

    getRescuerDetails({commit, state}, {id}) {
      commit(mutationTypes.RESCUERS_DETAIL_REQUEST);
      apiAdapter.fetchRescuerByID(id).then((data) => {
        commit(mutationTypes.RESCUERS_DETAIL_SUCCESS, data);
        return data;
      }).catch(() => {
        commit(mutationTypes.RESCUERS_DETAIL_FAILURE);
      });
    },

    sendRescuerDetails({state}) {
      apiAdapter.sendRescuer(state.currentRescuer.data).then((data) => {
        state.rescuers.data.push(state.currentRescuer.data);
      }).catch(() => {
      });
    },


    patchRescuerDetails({state}) {
      apiAdapter.patchRescuer(state.currentRescuer.data).then((data) => {
        let indexToEdit;
        state.currentRescuer.data = state.rescuers.data.forEach((res, index) => {
          if (res.id === state.currentRescuer.data.id) {
            indexToEdit = index;
          }
        });

        state.rescuers.data[indexToEdit] = state.currentRescuer.data;
      }).catch(() => {
      });
    },

    sendAreaDetails({state}) {
      apiAdapter.sendArea(state.currentArea.data).then((data) => {
        console.log(data);
      }).catch(() => {
      });
    },


    fetchActions({commit, state}) {
      commit(mutationTypes.ACTIONS_REQUEST);
      apiAdapter.fetchActions().then((data) => {
        commit(mutationTypes.ACTIONS_SUCCESS, data);
      }).catch((error) => {
        commit(mutationTypes.ACTIONS_FAILURE);
        throw error;
      });
    }
  };
}
