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
