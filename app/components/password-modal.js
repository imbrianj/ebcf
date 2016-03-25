import Ember from 'ember';
import CryptoJS from 'npm:crypto-js';

export default Ember.Component.extend({
  loginError: false,
  showPasswordModa: function(){
    $('#password-modal').modal('setting', 'closable', false).modal('show');
  }.on('didInsertElement'),
  actions: {
    enterPassword(){
      var password = this.get('password');
      var self = this;
      var sha1 = CryptoJS.SHA1(password).toString();
      var ajaxOptions = {
        url: '/api/v1/verify-password',
        data: {
          password: sha1
        },
        type: 'POST',
        dataType: 'json'
      };
      Ember.$.ajax(ajaxOptions).then(function(response){
        if (response.success) {
          // self.sendAction('loginSuccess');
          $("#password-modal").modal("hide");
        }	else {
          self.set('loginError', true);
        }
      });
      return false;
    }
  }
});
