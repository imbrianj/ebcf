import Ember from 'ember';

const {
  set,
  Route,
} = Ember;

export default Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', 'coaches');
    this.controllerFor('application').set('titleHeader', 'ABOUT US');
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags() {
    let headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-coaches',
        attrs: {
          name: 'title',
          content: 'EBCF Coaches',
        },
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-coaches',
        attrs: {
          name: 'description',
          content: 'We have knowledgeable and experienced coaches who know how to drive results.',
        },
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-coaches',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        },
      },
    ];

    set(this, 'headTags', headTags);
  },
});
