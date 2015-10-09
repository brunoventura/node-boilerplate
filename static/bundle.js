(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Vue.http.options.root = '/api';
Vue.http.headers.post['Content-Type'] = 'application/json';

window.router = new VueRouter({
  hashbang: false,
  history: true
});

var app = require('../views/index/index.js');

router.map({
    '/login': {
        component: require('../views/login/login.js')
    },
    '/signin': {
        component: require('../views/signin/signin.js')
    }
})

router.start(app, '#app');

},{"../views/index/index.js":4,"../views/login/login.js":6,"../views/signin/signin.js":8}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var auth = require('../../modules/auth.js');

module.exports = Vue.extend({
  el: '#app',
  template: require('./template.html'),
  data: {
    auth: false
  },
  created: function() {
    this.$set('auth', auth.isAuth());
  },
  methods: {
    logout: function() {
      auth.logout();
      this.$set('auth', auth.isAuth());
    }
  }
});

},{"../../modules/auth.js":2,"./template.html":5}],5:[function(require,module,exports){
module.exports = '<nav>\n  <div class="nav-wrapper container">\n    <a href="#" class="brand-logo">App</a>\n    <ul id="nav-mobile" class="right hide-on-med-and-down">\n      <li v-if="!auth" ><a v-link="/login">Login</a></li>\n      <li v-if="auth" ><a v-link="/" v-on="click: logout">Logout</a></li>\n      <li><a v-link="/signin">Sign In</a></li>\n    </ul>\n  </div>\n</nav>\n<div class="container">\n  <router-view></router-view>\n</div>\n';
},{}],6:[function(require,module,exports){
var userService = require('../../service/userService.js');
var auth = require('../../modules/auth.js');

module.exports = Vue.extend({
    template: require('./template.html'),
    methods: {
      submit: submit
    },
    route: {
      data: data
    }
});

function submit(event) {
  var user = {
    name: this.login,
    password: this.pass
  }
  userService.auth(user)
    .then(function(data) {
      auth.login(data.data.data.token);
      router.go('/');
    })
    .catch(function(err) {
      console.log(err);
    });
}

function data() {
}

},{"../../modules/auth.js":2,"../../service/userService.js":3,"./template.html":7}],7:[function(require,module,exports){
module.exports = '<div class="row">\n    <form class="col offset-s3 s6">\n      <div class="card">\n        <div class="card-content">\n          <span class="card-title activator grey-text text-darken-4">Login</span>\n          <div class="row">\n            <div class="input-field col offset-s1 s10">\n              <i class="material-icons prefix">account_circle</i>\n              <input id="icon_prefix" type="text" v-model="login" class="validate">\n              <label for="icon_prefix">Account / Mail</label>\n            </div>\n          </div>\n          <div class="row">\n            <div class="input-field col offset-s1 s10">\n              <i class="material-icons prefix">phone</i>\n              <input id="icon_telephone" type="tel" v-model="pass" class="validate">\n              <label for="icon_telephone">Password</label>\n            </div>\n          </div>\n          <div class="card-action left-align">\n            <a class="waves-effect waves-light btn-large blue lighten-1 white-text" v-on="click: submit"><i class="material-icons left">cloud</i>Login</a>\n          </div>\n        </div>\n      </div>\n    </form>\n</div>\n';
},{}],8:[function(require,module,exports){
module.exports = Vue.extend({
    template: require('./template.html')
});

},{"./template.html":9}],9:[function(require,module,exports){
module.exports = '<h4>Sign In {{$route.path}}</h4>\n';
},{}]},{},[1]);
