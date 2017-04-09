import Ember from 'ember';

const {
  get,
  set,
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', 'wods');
    this.controllerFor('application').set('titleHeader', 'NEWS');
  },

  model(params) {
    return RSVP.hash({
      post: this.store.find('post', params.post_id),
      callouts: this.store.query('callout', {
        fiter: {
          simple: {
            enabled: true,
          },
        },
      }),
    });
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setupController(controller, model) {
    controller.set('post', model.post);

    let callouts = model.callouts.filter(function(callout) {
      return callout.get('active') === true;
    });
    controller.set('callout', callouts.get('lastObject'));
  },

  setHeadTags(model) {
    let headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-post',
        attrs: {
          name: 'title',
          content: `News for ${get(model, 'prettyDate')}`,
        },
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-post',
        attrs: {
          name: 'description',
          content: get(model, 'title'),
        },
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-post',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        },
      },
    ];

    set(this, 'headTags', headTags);
  },
});
