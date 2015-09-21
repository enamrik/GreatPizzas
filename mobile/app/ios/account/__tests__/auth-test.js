jest.dontMock('../auth');

describe('auth', () => {
  it('should make authentication call to backend', () => {
    var http = require('../../../network/http');
    var api = require('../../../config/api');

    var auth = require('../auth');
    var returnValue = auth.login('username', 'password');

    var url = http.mock.calls[0][0];
    var payload = http.mock.calls[0][1];

    expect(url).toBe(api.domain + '/login');
    var credentials = JSON.parse(payload.body);
    expect(credentials.username).toBe('username');
    expect(credentials.password).toBe('password');
    expect(payload.headers['Accept']).toBe('application/json');
    expect(payload.headers['Content-Type']).toBe('application/json');
    expect(returnValue).not.toBeNull();
  });
});