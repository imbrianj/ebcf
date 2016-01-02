import Ember from 'ember';

export default Ember.Controller.extend({
  // actions: {
  //   createRental() {
  //      var title = this.get('newTitle');
  //      var owner = this.get('newOwner');
  //      var city = this.get('newCity');
  //      var type = this.get('newType');
  //      var image = this.get('newImage');
  //      var bedrooms = this.get('newBedrooms');
  //
  //      var file = this.get('file');
  //      var source = this.get('source');
  //      var binary = this.get('binary');
  //     //  var reader = new FileReader();
  //     //  reader.onload = function(e) {
  //     //    var data = e.target.result;
  //     //
  //     //    debugger;
  //      //
  //     //  };
  //     //  var data = reader.readAsDataURL(file)
  //     var canvas = document.getElementById('canvas');
  //     var img = new Image();
  //     img.src = document.getElementById('img').src;
  //   // img.src = "http://jsawebsitepublic.s3.amazonaws.com/wp-content/uploads/2015/12/IMG_4204.jpg"
  //
  //     // // var img = document.getElementById('img');
  //     // debugger;
  //     // var MAX_WIDTH = 300; //400; too big still
  //     // var MAX_HEIGHT = 300; //300 too big still
  //     // var width = img.width;
  //     // var height = img.height;
  //     //
  //     // if (width > height) {
  //     //   if (width > MAX_WIDTH) {
  //     //     height *= MAX_WIDTH / width;
  //     //     width = MAX_WIDTH;
  //     //   }
  //     // } else {
  //     //   if (height > MAX_HEIGHT) {
  //     //     width *= MAX_HEIGHT / height;
  //     //     height = MAX_HEIGHT;
  //     //   }
  //     // }
  //     // canvas.width = width;
  //     // canvas.height = height;
  //     // var ctx = canvas.getContext("2d");
  //     // ctx.drawImage(img, 0, 0, width, height);
  //     //
  //     // var dataURL = canvas.toDataURL("image/png");
  //     // dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  //
  //     var rental = this.store.createRecord('rental', {
  //       title: title,
  //       owner: owner,
  //       city: city,
  //       image: img.src,
  //       bedrooms: bedrooms,
  //       type: type
  //     });
  //     rental.save();
  //   }
  // }
});
