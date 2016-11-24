import Ember from 'ember';

const {
  set,
} = Ember;

export default Ember.Route.extend({
  beforeModel() {
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
        tagId: 'meta-description-tag-contact',
        attrs: {
          name: 'title',
          content: 'Contact Us',
        }
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-contact',
        attrs: {
          name: 'description',
          content: 'You can find us in-between 2nd and 3rd on Bell Street.',
        }
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-contact',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        }
      }
    ];

    set(this, 'headTags', headTags);
  },
});
