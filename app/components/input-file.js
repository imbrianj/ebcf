import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  attributeBindings: ['multiple', 'type'],
  tagName: 'input',
  type: 'file',
  multiple: true,
  files: null,
  change(event) {
    let { files } = event.target;
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i);
      this.get('files').pushObject(file);
    }
  },
});
