import request from 'services/request';

const API_DOMAIN = 'http://192.168.201.43:8080';
const API_NAMESPACE = `${API_DOMAIN}/api/v1`;
const RESPONSE_AUTHORIZATION_TOKEN = 'X-Authorization-Token';
const REQUEST_AUTHORIZATION_TOKEN = 'X-Authorization-Token';

class ApiAdapter {
  get authHeaders() {
    return {
      [REQUEST_AUTHORIZATION_TOKEN]: `${this.token || 'b6hda4uaamobal74cva5s1n9f5tu5rsro3tatdjjbkqbg6s4c58'}`
    };
  }

  setToken(token) {
    this.token = token;
  }

  get(url, payload) {
    return request({
      url,
      method: 'get',
      headers: this.authHeaders,
      data: payload
    }).then(({data}) => {
      return data;
    });
  }

  login({username, password}) {
    const data = {
      email: username,
      password
    };

    return request({
      url: `${API_NAMESPACE}/users/login`,
      method: 'post',
      mode: 'no-cors',
      headers: this.authHeaders,
      data
    }).then((response) => {
      return {
        user: response.data,
        token: response.data.accessToken
      };
    });
  }

  currentUser() {
    const url = `${API_NAMESPACE}/users/login`;
    return this.get(url);
  }

  fetchRescuers() {
    const url = `${API_NAMESPACE}/users/`;
    return this.get(url);
  }

  fetchRescuerByID(id) {
    const url = `${API_NAMESPACE}/users/${id}`;
    return this.get(url);
  }

  updateRescuer({data}) {
    return request({
      url: `${API_NAMESPACE}/users/${data.id}`,
      method: 'put',
      headers: this.authHeaders,
      data
    }).then(({response}) => {
      return response;
    });
  }

  sendRescuer(data) {
    return request({
      url: `${API_NAMESPACE}/users/register`,
      method: 'post',
      headers: this.authHeaders,
      data
    });
  }

  patchRescuer(data) {
    return request({
      url: `${API_NAMESPACE}/users/update`,
      method: 'post',
      headers: this.authHeaders,
      data
    });
  }

  // AREA

  sendArea(data) {
    return request({
      url: `${API_NAMESPACE}/rescue/add_areas`,
      method: 'post',
      headers: this.authHeaders,
      data
    });
  }


  // actions
  fetchActions() {
    const url = `${API_NAMESPACE}/rescue`;
    return this.get(url);
  }

  // history
  fetchHistory() {
    const url = `${API_NAMESPACE}/rescue`;
    return this.get(url, {active: false});
  }

  // rescue finish
  finishRescue(data) {
    return request({
      url: `${API_NAMESPACE}/rescue/finish`,
      method: 'post',
      headers: this.authHeaders,
      data
    });
  }
}

export default new ApiAdapter();
