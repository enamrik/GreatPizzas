'use strict';

import settings from "settings"
import http from "api_request/http"
import session from "great_pizzas/account/session"

module.exports = {
  login: function(username, password) {

      return http(settings["api-domain"] + "/login", {
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