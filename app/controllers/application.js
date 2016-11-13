import Ember from 'ember';

const {
  computed,
  Controller,
  $,
} = Ember;

export default Controller.extend({
  tagName: '',
  titleImage: '',
  titleHeader: '',
  showBanner: computed.and('titleImage', 'titleHeader'),

  currentPathChanged: function () {
    window.scrollTo(0, 0);
  }.observes('currentPath'),

  actions: {
    toggle: function() {
      $('.ui.sidebar').sidebar('toggle');
    }
  }
});
