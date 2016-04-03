import Ember from 'ember';
import CryptoJS from 'npm:crypto-js';

export default Ember.Component.extend({
  loginError: false,
  ajax: Ember.inject.service(),
  showPasswordModa: function(){
    $('#password-modal').modal('setting', 'closable', false).modal('show');
  }.on('didInsertElement'),
  actions: {
    enterPassword(){
      var password = this.get('password');
      var self = this;
      var sha1 = CryptoJS.SHA1(password).toString();

      this.get('ajax').request('/api/v1/verify-password', {
        method: 'POST',
        data: {
          password: sha1
        },
        dataType: "json"
      }).then(function(response){
        if (response.success) {
          $("#password-modal").modal("hide");
        }	else {
          self.set('loginError', true);
        }
      });
    }
  }
});
