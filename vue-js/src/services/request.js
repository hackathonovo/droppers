import queryString from 'qs';

function querify(data) {
  return queryString.stringify(data, {arrayFormat: 'brackets'});
}

function resolveStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(response.statusText);
}

function json(response) {
  return response.json().then((data) => {
    return {
      data,
      headers: response.headers
    };
  });
}

function expectsPayload(method) {
  const normalizedMethod = method.toLowerCase();
  return ['post', 'put', 'patch'].includes(normalizedMethod);
}

export default function({url, data = {}, method = 'get', headers = {}}) {
  let requestUrl = url;
  const requestData = {
    method,
    headers: {
      'Content-type': 'application/json',
      ...headers
    }
  };

  if (expectsPayload(method)) {
    requestData.body = JSON.stringify(data);
  }

  if (method === 'get') {
    const query = querify(data);
    requestUrl = query ? `${url}?${query}` : url;
  }

  return fetch(requestUrl, requestData)
    .then(resolveStatus)
    .then(json);
}
