import Ember from 'ember';
import EmberUploader from 'ember-uploader';

const {
  isEmpty,
  $,
} = Ember;

export default EmberUploader.FileField.extend({
  url: '/api/v1/sign',
  actions: {
  },
  filesDidChange(files) {
    let uploadURL = this.get('url');
    let self = this;
    let uploader = EmberUploader.S3Uploader.create({
      signingUrl: uploadURL,
    });

    uploader.on('didUpload', function(response) {
      $('.image-upload-wrapper .button').removeClass('loading');
      let res = $(response);
      let url = decodeURIComponent(res.find('Location')[0].textContent);
      self.sendAction('onComplete', url);
    });

    uploader.on('progress', function() {
      $('.image-upload-wrapper .button').addClass('loading');
    });

    uploader.on('didError', function(jqXHR, testStatus, errorThrown) {
      $('.image-upload-wrapper .button').removeClass('loading');
      let errorText = errorThrown.message;

      self.sendAction('onError', errorThrown, errorText);
    });

    if (!isEmpty(files)) {
      uploader.upload(files[0]);
    }
  },

});
