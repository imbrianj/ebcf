import Ember from 'ember';

export default Ember.Component.extend({
  file: null,

  actions: {
    fileSelectionChanged(file){
      this.set('file', file);
    }
  }
});
