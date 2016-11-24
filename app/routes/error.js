import Ember from 'ember';

const {
  set,
} = Ember;

export default Ember.Route.extend({
  setupController() {
    this.controllerFor('application').set('titleImage', '');
    this.controllerFor('application').set('titleHeader', '');
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags(model) {
    var headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-error',
        attrs: {
          name: 'title',
          content: 'Error',
        }
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-error',
        attrs: {
          name: 'description',
          content: 'Oops, looks like the page you are looking for doesn\'t exist or another error occurred.',
        }
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-error',
        attrs: {
          name: 'prerender-status-code',
          content: '404',
        }
      }
    ];

    set(this, 'headTags', headTags);
  },
});
