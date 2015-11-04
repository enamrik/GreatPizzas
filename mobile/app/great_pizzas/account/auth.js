'use strict';

import http from "api_request/http"
import session from "great_pizzas/account/session"

module.exports = {
  login: function(username, password) {

      return http("/login", {
        method:"POST",
        body: {
          username:username,
          password:password
        }
      })
        .then((data) => {
          //TODO: keep storing session for now until we convert specials to using redux
          session.startNewSession(data.user, data.token);
          return Promise.resolve(data);
        } );
  }
};