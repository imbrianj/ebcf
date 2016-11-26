import Ember from 'ember';

const {
  get,
  set,
} = Ember;

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('wod', params.wod_id);
  },

  beforeModel() {
    this.controllerFor('application').set('titleImage', 'wods');
    this.controllerFor('application').set('titleHeader', 'WOD ARCHIVE');
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags(model) {
    var headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-wod',
        attrs: {
          name: 'title',
          content: `Workout of the Day for ${get(model, 'prettyDate')}`,
        }
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-wod',
        attrs: {
          name: 'description',
          content: get(model, 'shortDescription'),
        }
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-wod',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        }
      }
    ];

    set(this, 'headTags', headTags);
  },
});
