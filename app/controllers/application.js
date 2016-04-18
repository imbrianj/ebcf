import Ember from 'ember';

export default Ember.Controller.extend({
  tagName: '',
  actions: {
    toggle: function(direction) {
      Ember.$('.ui.sidebar').sidebar('toggle');
    }
  }
});
