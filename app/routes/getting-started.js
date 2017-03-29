import Ember from 'ember';

const {
  set,
  Route,
} = Ember;

export default Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', 'getting-started');
    this.controllerFor('application').set('titleHeader', 'GETTING STARTED');
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags() {
    let headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-getting-started',
        attrs: {
          name: 'title',
          content: 'Getting Started',
        },
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-getting-started',
        attrs: {
          name: 'description',
          content: 'Not sure where to start? Find information about the sport of CrossFit, classes we offer, and how to sign up.',
        },
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-getting-started',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        },
      },
    ];

    set(this, 'headTags', headTags);
  },
});
