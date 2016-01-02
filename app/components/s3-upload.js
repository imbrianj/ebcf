import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  url: '/api/v1/sign',
  actions: {
    fileChanged: function(fileInfo){
      var ajaxOptions = {
        url: this.get('url'),
        data: {
          name: fileInfo.name,
          type: fileInfo.type,
          // dataURL: fileInfo.dataURL
        },
        type: 'GET',
        dataType: 'json'
      };

      Ember.$.ajax(ajaxOptions).then(function(response){
        var signed_request = response.signed_request;
        Ember.$.ajax({
          url: signed_request,
          type: 'PUT',
          body: fileInfo.dataURL,
          success: function() { console.log('Uploaded data successfully.'); }
        }).then(function(response){
          debugger;
        });
      });
    }
  },
  filesDidChange: function(files) {
    var uploadURL = this.get('url');
    var self = this;

    // files = this.get('files'),
    var uploader = EmberUploader.S3Uploader.create({
      url: uploadURL
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]);
      var ajaxOptions = {
        url: this.get('url'),
        data: {
          name: files[0].name,
          type: files[0].type
        },
        type: 'GET',
        dataType: 'json'
      };

      var fileReader = new FileReader();
      var fileInfo = {
        name: files[0].name,
        type: files[0].type,
        size: files[0].size
      };
      fileReader.onload = function(e) {
        var url = e.target.result;
        fileInfo.dataURL = url;
        // self.send('fileChanged', fileInfo);
      };

      fileReader.readAsBinaryString(files[0]);
      // Ember.$.ajax(ajaxOptions).then(function(response){
      //   var signed_request = response.signed_request;
      //   console.log(response.url);
      //   Ember.$.ajax({
      //     url: signed_request,
      //     type: 'PUT',
      //     data: files[0]
      //   }).then(function(response){
      //     debugger;
      //   });
      // });
      // Ember.$.ajax(ajaxOptions).then(function(response){
      //   var xhr = new XMLHttpRequest();
      //   xhr.open("PUT", response.signed_request);
      //   // xhr.setRequestHeader('x-amz-acl', 'public-read');
      //   xhr.onload = function() {
      //       if (xhr.status === 200) {
      //           // document.getElementById("preview").src = url;
      //           // document.getElementById("avatar_url").value = url;
      //           debugger;
      //       }
      //   };
      //   xhr.onerror = function() {
      //       alert("Could not upload file.");
      //   };
      //   debugger;
      //   xhr.send(files[0]);
      // });
      }
  }

});
