
function post({ url, body, onSuccess, onError }) {
  const request = new XMLHttpRequest();
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify(body));

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      const data = JSON.parse(request.responseText);
      if (request.status === 200) {
        onSuccess(data);
      } else {
        onError(data);
      }
    }
  };

  return request;
}

function get({ url, onSuccess, onError }) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      const data = JSON.parse(request.responseText);
      if (request.status === 200) {
        onSuccess(data);
      } else {
        onError(data);
      }
    }
  };

  return request;
}


function postWithHeaders({ url, body, headers, onSuccess, onError }) {
  const request = new XMLHttpRequest();
  request.open('POST', url);

  const _headers = { ...headers,
    'Content-Type': 'application/json'
  };

  Object.keys(_headers).forEach((h) => {
    request.setRequestHeader(h, _headers[h]);
  });

  const requestBody = body ? JSON.stringify(body) : undefined;

  request.send(requestBody);

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if ([200, 201].includes(request.status)) {
        const data = JSON.parse(request.response);
        if (onSuccess) onSuccess(data);
      } else {
        const { status, responseText } = request;
        if (onError) onError({ status, responseText });
      }
    }
  };

  return request;
}

function getWithHeaders({ url, headers, onSuccess, onError }) {
  const request = new XMLHttpRequest();
  request.open('GET', url);

  const _headers = { ...headers,
    'Content-Type': 'application/json',
    'SC-API-KEY': config['SC-API-KEY'],
    Authorization: `Bearer ${localStorage.token}`
  };

  Object.keys(_headers).forEach((h) => {
    request.setRequestHeader(h, _headers[h]);
  });

  request.send();

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      const data = JSON.parse(request.responseText);
      if (request.status === 200) {
        onSuccess && onSuccess(data);
      } else {
        onError && onError(data);
      }
    }
  };

  return request;
}

export { post, get, postWithHeaders, getWithHeaders };
