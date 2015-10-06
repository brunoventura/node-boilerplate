(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Vue.http.options.root = '/api';

var Login = Vue.extend({
    template: '<p>Login!</p>'
})

var Signin = Vue.extend({
    template: '<p>SignIn!</p>'
})

var router = new VueRouter({
  hashbang: false,
  history: true
});

var app = Vue.extend({
  el: '#app',
  ready: function() {
    this.$http.get('user', function(data, status, request) {
      console.log(data);
    });
  }
});

router.map({
    '/login': {
        component: require('../views/login.vue')
    },
    '/signin': {
        component: require('../views/signin.vue')
    }
})

router.start(app, '#app')

},{"../views/login.vue":2,"../views/signin.vue":3}],2:[function(require,module,exports){
var __vue_template__ = "<h4>Login</h4>";
;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;

},{}],3:[function(require,module,exports){
var __vue_template__ = "<h4>Sign In</h4>";
;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;

},{}]},{},[1]);
