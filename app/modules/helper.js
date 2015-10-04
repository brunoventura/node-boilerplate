'use strict';

module.exports = {
  defaultResolver: defaultResolver,
  responseSuccess: responseSuccess,
  responseError: responseError
}

function defaultResolver(promise, res) {
  promise
    .then(function(data) {
      responseSuccess(res, data);
    })
    .catch(function(err) {
      responseError({error: err});
    });
};

function responseSuccess(res, data) {
  res.json({success: true, data: data});
}

function responseError(res, error) {
  res.status(error.code).json({error: error.message});
}
