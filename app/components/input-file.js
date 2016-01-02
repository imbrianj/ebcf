import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['multiple', 'type'],
  tagName: 'input',
  type: 'file',
  multiple: true,
  files: null,
  change: function(event) {
    var files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      var file = files.item(i);
      this.get('files').pushObject(file);
    }
  }
});
