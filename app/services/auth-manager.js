import Ember from 'ember';
import CryptoJS from 'npm:crypto-js';

const {
  inject: {
    service,
  },
  Service,
} = Ember;

export default Service.extend({
  ajax: service(),
  loginError: false,
  authenticate(password) {
    let sha1 = CryptoJS.SHA1(password).toString();

    return this.get('ajax').request('/api/v1/verify-password', {
      method: 'POST',
      data: {
        password: sha1,
      },
      dataType: 'json',
    }).then((response) => {
      if (response.success) {
        this.cookie.setCookie('authentication', sha1, { expires: 1 });
        return true;
      }	else {
        return false;
      }
    });
  },
});
