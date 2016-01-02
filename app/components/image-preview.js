import Ember from 'ember';

export default Ember.Component.extend({
  // tagName: 'li',
  file: null,

  //  didInsertElement: function () {
  //    var self = this;
  //    var file = this.get('file');
  //    var reader = new FileReader();
  //    reader.onload = function(e) {
  //      var data = e.target.result;
  //      self.$("img.preview").attr("src", data);
  //    };
  //    reader.readAsDataURL(file);
  //  },

  actions: {
    fileSelectionChanged(file){
      this.set('file', file);
    }
  }
});
