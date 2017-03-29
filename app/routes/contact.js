import Ember from 'ember';

const {
  set,
  Route,
} = Ember;

export default Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', '');
    this.controllerFor('application').set('titleHeader', '');
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags() {
    let headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-contact',
        attrs: {
          name: 'title',
          content: 'Contact Us',
        },
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-contact',
        attrs: {
          name: 'description',
          content: 'You can find us just off 3rd & Blanchard: 2211 3rd Ave * Unit 3 * Seattle * WA 98121.',
        },
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-contact',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        },
      },
    ];

    set(this, 'headTags', headTags);
  },
});
