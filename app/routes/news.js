import Ember from 'ember';

const {
  set,
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  model() {
    return RSVP.hash({
      callouts: this.store.query('callout', {
        fiter: {
          simple: {
            enabled: true,
          },
        },
      }),
    });
  },

  beforeModel() {
    this.controllerFor('application').set('titleImage', 'wods');
    this.controllerFor('application').set('titleHeader', 'NEWS');
  },

  setupController(controller, model) {
    // controller.set('posts', model.posts);
    let callouts = model.callouts.filter(function(callout) {
      return callout.get('active') === true;
    });
    controller.set('callout', callouts.get('lastObject'));
    this.controllerFor('news').get('_postTask').perform();
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags() {
    let headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-news',
        attrs: {
          name: 'title',
          content: 'News',
        },
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-news',
        attrs: {
          name: 'description',
          content: 'Stay up to date on Elliott Bay CrossFit news and events and find tips on nutrition, health, and training.',
        },
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-news',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        },
      },
    ];

    set(this, 'headTags', headTags);
  },
});
