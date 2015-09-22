'use strict';

class UserSession {

  constructor() {
    this._clearSession();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  startNewSession(user, token) {
    this.token = token;
    this.user = user;
    this.authenticated = true;
  }

  endSession() {
    this._clearSession();
  }

  _clearSession() {
    this.user = {};
    this.token = "";
    this.authenticated = false;
  }
}

module.exports = new UserSession();