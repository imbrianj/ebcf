import Ember from 'ember';

const {
  set,
} = Ember;

export default Ember.Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', 'pricing');
    this.controllerFor('application').set('titleHeader', 'PRICING');
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags(model) {
    var headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-pricing',
        attrs: {
          name: 'title',
          content: 'Pricing',
        }
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-pricing',
        attrs: {
          name: 'description',
          content: 'We charge month to month, with no long-term commitment required. Our standard membership pricing includes unlimited CrossFit, Olympic Lifting, and Yoga classes.',
        }
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-pricing',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        }
      }
    ];

    set(this, 'headTags', headTags);
  },
});
