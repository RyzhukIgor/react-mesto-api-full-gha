const { CONFLICT_ERR } = require('./errors');

class ConflictUserErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERR;
  }
}

module.exports = ConflictUserErr;
