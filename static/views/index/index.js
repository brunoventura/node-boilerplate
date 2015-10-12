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
      router.go('/');
    }
  }
});
