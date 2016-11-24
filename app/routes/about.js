import Ember from 'ember';

const {
  set,
} = Ember;

export default Ember.Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', 'about');
    this.controllerFor('application').set('titleHeader', 'ABOUT US');
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags(model) {
    var headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-about',
        attrs: {
          name: 'title',
          content: 'About EBCF',
        }
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-about',
        attrs: {
          name: 'description',
          content: 'We are focused on providing the best possible environment for people of all fitness levels to help them live a healthier life style.',
        }
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-about',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        }
      }
    ];

    set(this, 'headTags', headTags);
  },
});
