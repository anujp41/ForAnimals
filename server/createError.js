function createError(errMsg, code) {
  const error = new Error(errMsg);
  error.status = code;
  return error;
}

module.exports = createError;