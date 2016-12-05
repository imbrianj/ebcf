import Ember from 'ember';

const {
  set,
} = Ember;

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      posts: this.store.query('post', {
        filter: {
          simple: {
            publishDate: {
              $lt: window.moment().toDate(),
            },
            enabled: true,
          }
        }
      });
    });
  },

  beforeModel() {
    this.controllerFor('application').set('titleImage', 'wods');
    this.controllerFor('application').set('titleHeader', 'NEWS');
  },

  setupController(controller, model) {
    controller.set('posts', model.posts);
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags(model) {
    var headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-news',
        attrs: {
          name: 'title',
          content: 'News',
        }
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-news',
        attrs: {
          name: 'description',
          content: 'Stay up to date on Elliott Bay CrossFit news and events and find tips on nutrition, health, and training.',
        }
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-news',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        }
      }
    ];

    set(this, 'headTags', headTags);
  },
});
