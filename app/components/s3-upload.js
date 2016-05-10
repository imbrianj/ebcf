import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  url: '/sign',
  actions: {
  },
  filesDidChange: function(files) {
    var uploadURL = this.get('url');
    var self = this;
    var uploader = EmberUploader.S3Uploader.create({
      url: uploadURL
    });

    uploader.on('didUpload', function(response){
      Ember.$('.image-upload-wrapper .button').removeClass('loading');
      var res = Ember.$(response);
      var url = decodeURIComponent(res.find('Location')[0].textContent);
      self.sendAction('onComplete', url);
    });

    uploader.on('progress', function(response){
      Ember.$('.image-upload-wrapper .button').addClass('loading');
    });

    uploader.on('didError', function(jqXHR, testStatus, errorThrown){
      Ember.$('.image-upload-wrapper .button').removeClass('loading');
      var errorText = errorThrown.message;

      self.sendAction('onError', errorThrown, errorText);
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]);
    }
  }

});
