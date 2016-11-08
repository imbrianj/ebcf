import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function(model) {
    this.setHeadTags(model);
  },

  setHeadTags: function(model) {
    var headTags = [{
      type: 'meta',
      tagId: 'post-description-tag',
      attrs: {
        name: 'description',
        content: model.get('title')
      }
    }, {
      type: 'meta',
      tagId: 'post-title-tag',
      attrs: {
        name: 'title',
        content: `Post for ${model.get('prettyDate')}`
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
    return this.store.find('post', params.post_id);
  }
});
