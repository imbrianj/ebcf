import Ember from 'ember';

export default Ember.Controller.extend({
  tagName: '',
  currentPathChanged: function () {
    window.scrollTo(0, 0);
  }.observes('currentPath'),
  actions: {
    toggle: function(direction) {
      Ember.$('.ui.sidebar').sidebar('toggle');
    }
  }
});
