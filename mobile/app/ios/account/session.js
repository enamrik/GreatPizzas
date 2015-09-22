'use strict';

class UserSession {

  constructor() {
    this._clearSession();
  }

  startNewSession(user, token) {
    this.token = token;
    this.user = user;
    this.isAuthenticated = true;
  }

  endSession() {
    this._clearSession();
  }

  _clearSession() {
    this.user = {};
    this.token = "";
    this.isAuthenticated = false;
  }
}

module.exports = new UserSession();