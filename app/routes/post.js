import Ember from 'ember';

const {
  get,
  set,
  Route,
} = Ember;

export default Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', 'wods');
    this.controllerFor('application').set('titleHeader', 'NEWS');
  },

  model(params) {
    return this.store.find('post', params.post_id);
  },

  afterModel(model) {
    this.setHeadTags(model);
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
