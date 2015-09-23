'use strict';

var api = require("../../config/api");
var http = require("../../network/http");
var session = require("./session");

module.exports = {
  login: function(username, password) {

      return http(api.domain + "/login", {
        method:"POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username:username,
          password:password
        })
      })
        .then((data) => {
          //TODO: keep storing session for now until we convert specials to using redux
          session.startNewSession(data.user, data.token);
          return Promise.resolve(data);
        } );
  }
};