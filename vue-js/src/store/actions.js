import * as mutationTypes from 'store/mutation-types';

export default function({apiAdapter, localStorage}) {
  return {
    login({commit}, {email, password}) {
      commit(mutationTypes.SESSION_REQUEST);
      return apiAdapter.login({
        email, password
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
    }
  };
}
