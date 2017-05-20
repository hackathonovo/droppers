import request from 'services/request';

const API_DOMAIN = 'http://192.168.201.43:8080';
const API_NAMESPACE = `${API_DOMAIN}/api/v1`;
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
    }).then(({response}) => {
      return response;
    }).catch(() => {
      return [
        {
          id: '5920570a25cb5f5bc9d789f2',
          email: 'fredi.saric@fer.hr',
          firstName: 'Fredi',
          lastName: 'Šarić',
          phoneNumber: '095 4233761',
          specialities: [
            'MASTER_OF_UNIVERS'
          ],
          address: {
            city: 'Zagreb',
            country: 'Croatia',
            postalCode: '10000',
            street: 'Mlinovi',
            streetNumber: '36'
          },
          lastKnownLocation: null,
          rank: null,
          region: null,
          hasSearchDog: null
        }, {
          id: '5920570a24cb5f5bc9d789f2',
          email: 'matej.janjic@fer.hr',
          firstName: 'Matej',
          lastName: 'Janjić',
          phoneNumber: '091 187 1140',
          specialities: [
            'pleb'
          ],
          address: {
            city: 'Stupnik',
            country: 'Croatia',
            postalCode: '10255',
            street: 'Gorenska',
            streetNumber: '12'
          },
          lastKnownLocation: null,
          rank: null,
          region: null,
          hasSearchDog: null
        }, {
          id: '5920570a25cb5f5bc9e789f2',
          email: 'matija.simicic@fer.hr',
          firstName: 'Matija',
          lastName: 'Šimićić',
          phoneNumber: '095 4233761',
          specialities: [
            'BEAR'
          ],
          address: {
            city: 'Zagreb',
            country: 'Croatia',
            postalCode: '10040',
            street: 'Dankovečka',
            streetNumber: '9'
          },
          lastKnownLocation: null,
          rank: null,
          region: null,
          hasSearchDog: null
        }
      ];
    });
  }

  login({username, password}) {
    const data = {
      username,
      password
    };

    return request({
      url: `${API_NAMESPACE}/users/login`,
      method: 'post',
      data
    }).then((response) => {
      return {
        user: response.data,
        token: response.headers.get(RESPONSE_AUTHORIZATION_TOKEN)
      };
    });
  }

  currentUser() {
    const url = `${API_NAMESPACE}/users/login`;
    return this.get(url);
  }

  fetchRescuers() {
    const url = `${API_NAMESPACE}/users`;
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
}

export default new ApiAdapter();
