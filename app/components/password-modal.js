import Ember from 'ember';

const {
  inject: {
    service,
  },
  set,
  Component,
  $,
} = Ember;

export default Component.extend({
  loginError: false,
  ajax: service(),
  authManager: service(),
  showPasswordModal: function() {
    let token = this.get('cookie').getCookie('authentication');
    if (!token) {
      $('#password-modal').modal('setting', 'closable', false).modal('show');
    }
  }.on('didInsertElement'),
  actions: {
    enterPassword() {
      let password = this.get('password');

      this.get('authManager').authenticate(password).then((response) => {
        if (response) {
          $('#password-modal').modal('hide');
        }	else {
          set(this, 'loginError', true);
        }
      });
    },
  },
});
