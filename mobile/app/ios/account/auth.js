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
          session.startNewSession(data.user, data.token);
        } );
  }
};