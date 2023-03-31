const { ERROR_BAD_REQUEST } = require('./errors');

class ErrBadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_BAD_REQUEST;
  }
}

module.exports = ErrBadRequest;
