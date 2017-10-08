import Ember from 'ember';

const {
  computed,
  get,
  Controller,
  observer,
  $,
} = Ember;

export default Controller.extend({
  tagName: '',
  titleImage: '',
  titleHeader: '',
  showBanner: computed.and('titleImage', 'titleHeader'),

  currentPathChanged: observer('currentPath', function() {
    if (get(this, 'currentPath') !== 'pricing.privacy') {
      window.scrollTo(0, 0);
    }
  }),

  actions: {
    toggle() {
      $('.ui.sidebar').sidebar('toggle');
    },
  },
});
