'use strict';

describe('auth', () => {
  let auth, httpStub, settingsStub, startNewSessionStub;

  const authResponse = {
    "user": {
      "id": "8f7d1b70-f946-4ad2-8590-c6575d4bbf53",
      "firstName": "Sam",
      "lastName": "Doe",
      "email": "sam@gmail.com"
    },
    "token": "8cd283d8b7bacc277f2bae5e26ce6d1e"
  };

  beforeEach(() => {
    httpStub = sinon.stub();
    settingsStub = {'api-domain': 'stuff'};
    startNewSessionStub = sinon.stub();

    auth = require('inject!great_pizzas/account/auth')({
      'settings':  settingsStub,
      'network/http': httpStub,
      'great_pizzas/account/session': { startNewSession : startNewSessionStub }
    });
  });

  it('should make authentication call to backend', () => {
    httpStub.returns(Promise.resolve(authResponse));

    return auth.login('username', 'password').then(() => {
      var payload = httpStub.getCall(0).args[1];

      var url = httpStub.getCall(0).args[0];
      expect(url).to.eq(settingsStub["api-domain"] + '/login');

      var credentials = JSON.parse(payload.body);
      expect(credentials.username).to.eq('username');
      expect(credentials.password).to.eq('password');

      expect(payload.headers['Accept']).to.eq('application/json');
      expect(payload.headers['Content-Type']).to.eq('application/json');
    });
  });

  it('should create user session on successful authentication', () => {
    httpStub.returns(Promise.resolve(authResponse));

    return auth.login('username', 'password').then(() => {
      var user = startNewSessionStub.getCall(0).args[0];
      expect(user).to.eq(authResponse.user);
      var token = startNewSessionStub.getCall(0).args[1];
      expect(token).to.eq(authResponse.token);
    });
  });

  it('should not create user session on failed authentication', () => {
    httpStub.returns(Promise.reject(new Error()));

    return auth.login('username', 'password').catch(() => {
      expect(startNewSessionStub).not.to.have.been.called;
    });
  });
});