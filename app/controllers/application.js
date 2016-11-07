import Ember from 'ember';

const {
  computed,
} = Ember;

export default Ember.Controller.extend({
  tagName: '',
  titleImage: '',
  titleHeader: '',
  showBanner: computed.and('titleImage', 'titleHeader'),

  currentPathChanged: function () {
    window.scrollTo(0, 0);
  }.observes('currentPath'),

  actions: {
    toggle: function() {
      Ember.$('.ui.sidebar').sidebar('toggle');
    }
  }
});
