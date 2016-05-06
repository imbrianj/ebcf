import Ember from 'ember';
import CryptoJS from 'npm:crypto-js';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  loginError: false,
  authenticate(password) {
    var sha1 = CryptoJS.SHA1(password).toString();
    var _this = this;

    return this.get('ajax').request('/api/v1/verify-password', {
      method: 'POST',
      data: {
        password: sha1
      },
      dataType: "json"
    }).then(function(response){
      if (response.success) {
        _this.cookie.setCookie('authentication', sha1, { expires: 1});
        return true;
      }	else {
        return false;
      }
    });
  },
});
