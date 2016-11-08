import Ember from 'ember';

export default Ember.Route.extend({
  headTags: [{
    type: 'meta',
    tagId: 'news-description-tag',
    attrs: {
      name: 'description',
      content: 'Stay up to date on EBCF news and events and find tips on nutrition, health, and training.'
      }
    }, {
      type: 'meta',
      tagId: 'news-title-tag',
      attrs: {
        name: 'title',
        content: 'News'
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

  model() {
    return Ember.RSVP.hash({
      posts: this.store.findAll('post'),
    });
  },

  setupController(controller, model) {
    controller.set('posts', model.posts);
  }
});
