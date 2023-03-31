const { UNAUTH_ERR } = require('./errors');

class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTH_ERR;
  }
}

module.exports = NotAuthError;
