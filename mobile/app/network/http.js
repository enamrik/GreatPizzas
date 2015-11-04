import fetch from 'network/fetch_wrapper'
import NetworkError from 'network/network_error'
import JsonParseError from 'network/json_parse_error'

const HTTP_STATUS_NO_CONTENT = 204;

export default function(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (isSuccessfulResponse(response)) {
          handleSuccess(response, resolve, reject);
        }
        else {
          handleFailure(response, reject);
        }
      });
  });
}

function handleFailure(response, reject) {
  response.json()
    .then((data) => {
      reject(new NetworkError({
        json: data,
        statusText: response.statusText,
        statusCode: response.status}));
    })
    .catch(() => {
      reject(new NetworkError({
        statusText: response.statusText,
        statusCode: response.status}));
    });
}

function handleSuccess(response, resolve, reject) {
  if(response.status === HTTP_STATUS_NO_CONTENT) {
    resolve();
    return;
  }
  response.json()
    .then((data) => {
      resolve(data);
    })
    .catch((e) => {
      reject(new JsonParseError(e.message));
    });
}

function isSuccessfulResponse(response) {
  return response.status >= 200 && response.status < 300;
}


