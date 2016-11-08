import Ember from 'ember';

export default Ember.Route.extend({
  headTags: [{
    type: 'meta',
    tagId: 'about-description-tag',
    attrs: {
      name: 'description',
      content: 'We are focused on providing the best possible environment for people of all fitness levels to help them live a healthier life style.'
      }
    }, {
      type: 'meta',
      tagId: 'about-title-tag',
      attrs: {
        name: 'title',
        content: 'About Us'
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
