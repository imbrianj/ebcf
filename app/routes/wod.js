import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function(model) {
    this.setHeadTags(model);
  },

  setHeadTags: function(model) {
    var headTags = [{
      type: 'meta',
      tagId: 'wod-description-tag',
      attrs: {
        name: 'description',
        content: model.get('conditioning')
      }
    }, {
      type: 'meta',
      tagId: 'wod-title-tag',
      attrs: {
        name: 'title',
        content: `WOD for ${model.get('prettyDate')}`
      },
    }, {
      type: 'meta',
      tagId: 'prerender-status-code',
      attrs: {
        name: 'prerender-status-code',
        content: '200'
      },
    }];

    this.set('headTags', headTags);
  },
  model: function(params) {
    return this.store.find('wod', params.wod_id);
  }
});
