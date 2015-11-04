import fetch from 'api_request/fetch_wrapper'
import NetworkError from 'api_request/network_error'
import JsonParseError from 'api_request/json_parse_error'
import settings from "settings"

const HTTP_STATUS_NO_CONTENT = 204;

export default function(url, options) {
  return new Promise((resolve, reject) => {

    let finalOpts = Object.assign({}, options, {
      body: stringifyBody(options.body),
      headers: Object.assign({}, options.headers, getExtraHeaders(options))
    });

    fetch(settings["api-domain"] + url, finalOpts)
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

function stringifyBody(body) {
  return body == typeof 'string' ? body : JSON.stringify(body);
}

function getExtraHeaders(options) {
  let headers = {
    'Accept': 'application/json'
  };
  if(options.body) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
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


