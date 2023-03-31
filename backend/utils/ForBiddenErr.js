const { FORBIDDEN_ERR } = require('./errors');

class ForBiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERR;
  }
}

module.exports = ForBiddenErr;
