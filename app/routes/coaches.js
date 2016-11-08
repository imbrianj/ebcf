import Ember from 'ember';

export default Ember.Route.extend({
  headTags: [{
    type: 'meta',
    tagId: 'coaches-description-tag',
    attrs: {
      name: 'description',
      content: 'We have knowledgeable and experienced coaches who know how to drive results.'
      }
    }, {
      type: 'meta',
      tagId: 'coaches-title-tag',
      attrs: {
        name: 'title',
        content: 'Our Coaches'
      }
    }, {
      type: 'meta',
      tagId: 'prerender-status-code',
      attrs: {
        name: 'prerender-status-code',
        content: '200'
      },
    }
  ]
});
