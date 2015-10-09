module.exports = {
  isAuth: isAuth,
  logout: logout,
  login: login
}

function isAuth() {
  return !!(Vue.http.headers.common['x-access-token'] || $.cookie('jwt'));
}

function login(token) {
  Vue.http.headers.common['x-access-token'] = token;
  $.cookie('jwt', token, {'max-age': 1440 * 1000, path: '/'});
}

function logout() {
  delete Vue.http.headers.common['x-access-token'];
  $.removeCookie('jwt');
}
