import Ember from 'ember';

export default Ember.Route.extend({
  headTags: [{
    type: 'meta',
    tagId: 'getting-started-description-tag',
    attrs: {
      name: 'description',
      content: 'On this page you’ll find information about the sport of CrossFit, classes we offer, and how to sign up.'
      }
    }, {
      type: 'meta',
      tagId: 'getting-started-title-tag',
      attrs: {
        name: 'title',
        content: 'Getting Started'
      }
    }, {
      type: 'meta',
      tagId: 'prerender-status-code',
      attrs: {
        name: 'prerender-status-code',
        content: '200'
      },
    }
  ],
});
