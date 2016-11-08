import Ember from 'ember';

export default Ember.Route.extend({
  headTags: [{
    type: 'meta',
    tagId: 'schedule-description-tag',
    attrs: {
      name: 'description',
      content: 'Regular classes: Monday - Friday 6am, 7am, 8am, 12pm, 4pm, 5pm, 6pm, 7pm.'
      }
    }, {
      type: 'meta',
      tagId: 'schedule-title-tag',
      attrs: {
        name: 'title',
        content: 'Schedule'
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
});
