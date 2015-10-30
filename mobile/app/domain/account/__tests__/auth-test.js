'use strict';

jest.dontMock('../auth');

describe('auth', () => {
  const authResponse = {
    "user": {
      "id": "8f7d1b70-f946-4ad2-8590-c6575d4bbf53",
      "firstName": "Sam",
      "lastName": "Doe",
      "email": "sam@gmail.com"
    },
    "token": "8cd283d8b7bacc277f2bae5e26ce6d1e"
  };

  pit('should make authentication call to backend', () => {
    var http = require('../../../network/http');
    http.mockImplementation((cb) => Promise.resolve(authResponse));

    var auth = require('../auth');
    return auth.login('username', 'password').then(() => {

      var url = http.mock.calls[0][0];
      var payload = http.mock.calls[0][1];

      var api_domain = require("../../../settings")["api-domain"];
      expect(url).toEqual(api_domain + '/login');
      var credentials = JSON.parse(payload.body);
      expect(credentials.username).toEqual('username');
      expect(credentials.password).toEqual('password');
      expect(payload.headers['Accept']).toEqual('application/json');
      expect(payload.headers['Content-Type']).toEqual('application/json');
    });
  });

  pit('should create user session on successful authentication', () => {
   var http = require('../../../network/http');
    http.mockImplementation((cb) => Promise.resolve(authResponse));

    return require('../auth').login('username', 'password').then(() => {
      var session = require('../session');
      var user = session.startNewSession.mock.calls[0][0];
      expect(user).toEqual(authResponse.user);
      var token = session.startNewSession.mock.calls[0][1];
      expect(token).toEqual(authResponse.token);
    });
  });

  pit('should not create user session on failed authentication', () => {
    var http = require('../../../network/http');
    http.mockImplementation((cb) => Promise.reject());

    return require('../auth').login('username', 'password').then(() => {
      var session = require('../session');
      expect(session.startNewSession).not.toBeCalled();
    });
  });
});