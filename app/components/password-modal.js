import Ember from 'ember';
import CryptoJS from 'npm:crypto-js';

export default Ember.Component.extend({
  loginError: false,
  ajax: Ember.inject.service(),
  authManager: Ember.inject.service(),
  showPasswordModal: function() {
    var token = this.get('cookie').getCookie('authentication');
    if (!token) {
      Ember.$('#password-modal').modal('setting', 'closable', false).modal('show');
    }
  }.on('didInsertElement'),
  actions: {
    enterPassword(){
      var _this = this;
      var password = this.get('password');

      this.get('authManager').authenticate(password).then(function(response){
        if (response) {
          Ember.$("#password-modal").modal("hide");
        }	else {
          _this.set('loginError', true);
        }
      });
    }
  }
});
