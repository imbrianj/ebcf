import Ember from 'ember';

export default Ember.Component.extend({
  notLoggedIn: true,
  loginError: false,
  showPasswordModa: function(){
    $('#password-modal').modal('setting', 'closable', false).modal('show');
  }.on('didInsertElement'),
  actions: {
    enterPassword(){
      var password = this.get('password');
      var self = this;
      var ajaxOptions = {
        url: '/api/v1/verify-password',
        data: {
          password: password
        },
        type: 'POST',
        dataType: 'json'
      };
      Ember.$.ajax(ajaxOptions).then(function(response){
        if (response.success) {
          self.sendAction('loginSuccess');
          $("#password-modal").modal("hide");
        }	else {
          self.set('loginError', true);
        }
      });
      return false;
    }
  }
});
