import Ember from 'ember';

export default Ember.Controller.extend({
  tags: [],
  actions: {
    getWod() {
      debugger;
      this.set('tags', this.get('model').get('tags'));
    }
  }
});
