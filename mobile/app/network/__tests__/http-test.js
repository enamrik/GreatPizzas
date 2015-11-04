describe('http', () => {
  const NetworkError = require('network/network_error');
  const JsonParseError = require('network/json_parse_error');

  it('should forward call to fetch', () => {
    const url = 'http://localhost:8080/users';
    const options = {}, jsonData = {};
    const parseJsonStub = sinon.stub().resolves(jsonData);
    const response = {status: 200, json: parseJsonStub};
    const fetchStub = sinon.stub().resolves(response);

    const http = require('inject!network/http')({ 'network/fetch_wrapper': fetchStub });
    http(url, options);

    expect(fetchStub).to.have.been.calledWith(url, options);
  });

  it('should resolve returned promise if fetch has success code and valid json', () => {
    const jsonData = {};
    const parseJsonStub = sinon.stub().resolves(jsonData);
    const response = {status: 200, json: parseJsonStub, statusText:'OK'};
    const fetchStub = sinon.stub().resolves(response);

    const http = require('inject!network/http')({ 'network/fetch_wrapper': fetchStub });
    const responsePromise = http('http://localhost:8080/users', {});

    return expect(responsePromise).to.eventually.deep.eq(jsonData);
  });

  it('should reject returned promise if fetch has success code but invalid json', () => {
    const parseJsonStub = sinon.stub().rejects(new Error("someError"));
    const response = {status: 200, json: parseJsonStub, statusText:'OK'};
    const fetchStub = sinon.stub().resolves(response);

    const http = require('inject!network/http')({ 'network/fetch_wrapper': fetchStub });
    const responsePromise = http('http://localhost:8080/users', {});

    const expectedError = new JsonParseError("someError");
    return expect(responsePromise).to.have.been.rejected.and.eventually.deep.eq(expectedError);
  });

  it('should reject returned promise with json data if fetch has failure status code and json body', () => {
    const jsonData = {};
    const parseJsonStub = sinon.stub().resolves(jsonData);
    const response = {status: 404, json: parseJsonStub, statusText:'Not Found'};
    const fetchStub = sinon.stub().resolves(response);

    const http = require('inject!network/http')({ 'network/fetch_wrapper': fetchStub });
    const responsePromise = http('http://localhost:8080/users', {});

    const expectedError = new NetworkError({json: jsonData, statusCode:404, statusText: 'Not Found'});
    return expect(responsePromise).to.have.been.rejected.and.eventually.deep.eq(expectedError);
  });

  it('should reject returned promise without json data if fetch has failure status code but no json body', () => {
    const parseJsonStub = sinon.stub().rejects(new Error("someError"));
    const response = {status: 404, json: parseJsonStub, statusText:'Not Found'};
    const fetchStub = sinon.stub().resolves(response);

    const http = require('inject!network/http')({ 'network/fetch_wrapper': fetchStub });
    const responsePromise = http('http://localhost:8080/users', {});

    const expectedError = new NetworkError({statusCode:404, statusText: 'Not Found'});
    return expect(responsePromise).to.have.been.rejected.and.eventually.deep.eq(expectedError);
  });
});