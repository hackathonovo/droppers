import request from 'services/request';

const API_NAMESPACE = 'api/v1';
const RESPONSE_AUTHORIZATION_TOKEN = 'X-Authorization-Token';
const REQUEST_AUTHORIZATION_TOKEN = 'Authorization';

class ApiAdapter {
  get authHeaders() {
    return {
      [REQUEST_AUTHORIZATION_TOKEN]: `Bearer ${this.token}`
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

  login({email, password}) {
    const data = {
      email,
      password
    };
    return Promise.resolve(() => {
      return {
        user: 'mjanjic',
        token: 'jf3489fi'
      };
    });

    // TODO uncomment when api auth is done

    // return request({
    //   url: `${API_NAMESPACE}/users/sessions`,
    //   method: 'post',
    //   data
    // }).then((response) => {
    //   return {
    //     user: response.data,
    //     token: response.headers.get(RESPONSE_AUTHORIZATION_TOKEN)
    //   };
    // });
  }

  currentUser() {
    const url = `${API_NAMESPACE}/users/sessions`;
    return this.get(url);
  }
}

export default new ApiAdapter();
