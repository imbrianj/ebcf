import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  url: '/api/v1/sign',
  actions: {
  },
  filesDidChange: function(files) {
    var uploadURL = this.get('url');
    var self = this;
    var uploader = EmberUploader.S3Uploader.create({
      url: uploadURL
    });

    uploader.on('didUpload', function(response){
      var res = $(response);

      var url = decodeURIComponent(res.find('Location')[0].textContent);
      self.sendAction('onComplete', url);
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]);
    }
  }

});