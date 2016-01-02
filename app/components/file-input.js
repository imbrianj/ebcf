import Ember from 'ember';

export default Ember.Component.extend({
  type: 'file',
  change: function(e){
    var self = this;
    var files = e.target.files;
    var file = files[0];

    var fileInfo = {
      name: file.name,
      type: file.type,
      size: file.size
    };

    var fileReader = new FileReader();

    fileReader.onload = function(e) {
      var dataURL = e.target.result;
      fileInfo.dataURL = dataURL;
      self.sendAction('fileChanged', fileInfo);
    };

    fileReader.readAsDataURL(file);
  }
});
