describe('http', () => {
  const NetworkError = require('api_request/network_error');
  const JsonParseError = require('api_request/json_parse_error');
  const domain = require('settings')["api-domain"];

  it('should forward call to fetch', () => {
    const options = {}, jsonData = {};
    const parseJsonStub = sinon.stub().resolves(jsonData);
    const response = {status: 200, json: parseJsonStub};
    const fetchStub = sinon.stub().resolves(response);

    const http = require('inject!api_request/http')({ 'api_request/fetch_wrapper': fetchStub });
    http('/user', options);

    expect(fetchStub).to.have.been.calledWith(domain + '/user');
  });

  it('should stringify body when body is an object', () => {
    const jsonData = {};
    const parseJsonStub = sinon.stub().resolves(jsonData);
    const response = {status: 200, json: parseJsonStub};
    const fetchStub = sinon.stub().resolves(response);
    const requestOptions = {body:"someString"};

    const http = require('inject!api_request/http')({ 'api_request/fetch_wrapper': fetchStub });

    return http('/user', requestOptions).then(() =>{
      let options = fetchStub.firstCall.args[1];
      expect(JSON.parse(options.body)).to.deep.eq(requestOptions.body);
    });
  });

  it('should leave body alone if already a string', () => {
    const jsonData = {};
    const parseJsonStub = sinon.stub().resolves(jsonData);
    const response = {status: 200, json: parseJsonStub};
    const fetchStub = sinon.stub().resolves(response);
    const requestOptions = {body:"someString"};

    const http = require('inject!api_request/http')({ 'api_request/fetch_wrapper': fetchStub });

    return http('/user', requestOptions).then(() =>{
      let options = fetchStub.firstCall.args[1];
      expect(JSON.parse(options.body)).to.deep.eq(requestOptions.body);
    });
  });

  it('should set content-type to application/json if body is present', () => {
    const jsonData = {};
    const parseJsonStub = sinon.stub().resolves(jsonData);
    const response = {status: 200, json: parseJsonStub};
    const fetchStub = sinon.stub().resolves(response);
    const requestOptions = {body:"someString"};

    const http = require('inject!api_request/http')({ 'api_request/fetch_wrapper': fetchStub });

    return http('/user', requestOptions).then(() =>{
      let options = fetchStub.firstCall.args[1];
      expect(options.headers['Content-Type']).to.deep.eq('application/json');
    });
  });

  it("should not set content-type to application/json if body isn't present", () => {
    const jsonData = {};
    const parseJsonStub = sinon.stub().resolves(jsonData);
    const response = {status: 200, json: parseJsonStub};
    const fetchStub = sinon.stub().resolves(response);
    const requestOptions = {};

    const http = require('inject!api_request/http')({ 'api_request/fetch_wrapper': fetchStub });

    return http('/user', requestOptions).then(() =>{
      let options = fetchStub.firstCall.args[1];
      expect(options.headers['Content-Type']).to.be.undefined;
    });
  });

  it("should set accept header to application/json", () => {
    const jsonData = {};
    const parseJsonStub = sinon.stub().resolves(jsonData);
    const response = {status: 200, json: parseJsonStub};
    const fetchStub = sinon.stub().resolves(response);
    const requestOptions = {};

    const http = require('inject!api_request/http')({ 'api_request/fetch_wrapper': fetchStub });

    return http('/user', requestOptions).then(() =>{
      let options = fetchStub.firstCall.args[1];
      expect(options.headers['Accept']).to.deep.eq('application/json');
    });
  });

  it('should resolve returned promise if fetch has success code and valid json', () => {
    const jsonData = {};
    const parseJsonStub = sinon.stub().resolves(jsonData);
    const response = {status: 200, json: parseJsonStub, statusText:'OK'};
    const fetchStub = sinon.stub().resolves(response);

    const http = require('inject!api_request/http')({ 'api_request/fetch_wrapper': fetchStub });
    const responsePromise = http('http://localhost:8080/users', {});

    return expect(responsePromise).to.eventually.deep.eq(jsonData);
  });

  it('should reject returned promise if fetch has success code but invalid json', () => {
    const parseJsonStub = sinon.stub().rejects(new Error("someError"));
    const response = {status: 200, json: parseJsonStub, statusText:'OK'};
    const fetchStub = sinon.stub().resolves(response);

    const http = require('inject!api_request/http')({ 'api_request/fetch_wrapper': fetchStub });
    const responsePromise = http('http://localhost:8080/users', {});

    const expectedError = new JsonParseError("someError");
    return expect(responsePromise).to.have.been.rejected.and.eventually.deep.eq(expectedError);
  });

  it('should reject returned promise with json data if fetch has failure status code and json body', () => {
    const jsonData = {};
    const parseJsonStub = sinon.stub().resolves(jsonData);
    const response = {status: 404, json: parseJsonStub, statusText:'Not Found'};
    const fetchStub = sinon.stub().resolves(response);

    const http = require('inject!api_request/http')({ 'api_request/fetch_wrapper': fetchStub });
    const responsePromise = http('http://localhost:8080/users', {});

    const expectedError = new NetworkError({json: jsonData, statusCode:404, statusText: 'Not Found'});
    return expect(responsePromise).to.have.been.rejected.and.eventually.deep.eq(expectedError);
  });

  it('should reject returned promise without json data if fetch has failure status code but no json body', () => {
    const parseJsonStub = sinon.stub().rejects(new Error("someError"));
    const response = {status: 404, json: parseJsonStub, statusText:'Not Found'};
    const fetchStub = sinon.stub().resolves(response);

    const http = require('inject!api_request/http')({ 'api_request/fetch_wrapper': fetchStub });
    const responsePromise = http('http://localhost:8080/users', {});

    const expectedError = new NetworkError({statusCode:404, statusText: 'Not Found'});
    return expect(responsePromise).to.have.been.rejected.and.eventually.deep.eq(expectedError);
  });
});