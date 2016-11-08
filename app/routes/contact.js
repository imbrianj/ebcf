import Ember from 'ember';

export default Ember.Route.extend({
  headTags: [{
    type: 'meta',
    tagId: 'contact-description-tag',
    attrs: {
      name: 'description',
      content: 'You can find us in-between 2nd and 3rd on Bell Street.'
      }
    }, {
      type: 'meta',
      tagId: 'contact-title-tag',
      attrs: {
        name: 'title',
        content: 'Contact Us'
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
