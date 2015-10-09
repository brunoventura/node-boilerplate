module.exports = {
  get: get,
  auth: auth
}

function get() {
  return Vue.http.get('user');
}

function auth(data) {
  return Vue.http.post('authenticate', data);
}
