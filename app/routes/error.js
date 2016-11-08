import Ember from 'ember';

export default Ember.Route.extend({
  headTags: [{
      type: 'meta',
      tagId: 'error-title-tag',
      attrs: {
        name: 'title',
        content: 'Error'
      }
    }, {
      type: 'meta',
      tagId: 'prerender-status-code',
      attrs: {
        name: 'prerender-status-code',
        content: '404'
      },
    }
  ],
});
