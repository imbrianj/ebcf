import Ember from 'ember';

const {
  get,
  set,
  Route,
} = Ember;

export default Route.extend({
  model(params) {
    return this.store.find('bootcamp', params.bootcamp_id);
  },

  beforeModel() {
    this.controllerFor('application').set('titleImage', 'wods');
    this.controllerFor('application').set('titleHeader', 'BOOTCAMP');
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags(model) {
    let headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-bootcamp',
        attrs: {
          name: 'title',
          content: `Bootcamp workout for ${get(model, 'prettyDate')}`,
        },
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-bootcamp',
        attrs: {
          name: 'description',
          content: get(model, 'shortDescription'),
        },
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-bootcamp',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        },
      },
    ];

    set(this, 'headTags', headTags);
  },
});
