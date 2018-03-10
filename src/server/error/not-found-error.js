module.exports = class NotFoundError extends Error {
  constructor(reason, code) {
    super();
    this.code = code || 404;
    this.message = `Not Found`;
    this.errorMessage = reason;
  }
};
