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
