'use strict';

module.exports = errorHandler;

function errorHandler(model) {
  var error = {
    entity: model
  };

  return {
    notFound: function(message, code) {
      error.message = message || "Not found";
      error.code = code || 404;
      return error;
    },
    serverError: function(message, code) {
      error.message = message || "Internal Server Error";
      error.code = code || 500;
      return error;
    },
    authenticationError: function(message, code) {
      error.message = message || "Authentication Failed";
      error.code = code || 403;
      return error;
    }
  }
};
