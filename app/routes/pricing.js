import Ember from 'ember';

export default Ember.Route.extend({
  headTags: [{
    type: 'meta',
    tagId: 'pricing-description-tag',
    attrs: {
      name: 'description',
      content: 'We charge month to month, with no long-term commitments required.'
      }
    }, {
      type: 'meta',
      tagId: 'pricing-title-tag',
      attrs: {
        name: 'title',
        content: 'Pricing'
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
