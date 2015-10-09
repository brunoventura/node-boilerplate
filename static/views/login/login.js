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
