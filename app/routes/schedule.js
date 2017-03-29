import Ember from 'ember';

const {
  set,
  Route,
} = Ember;

export default Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', 'schedule');
    this.controllerFor('application').set('titleHeader', 'SCHEDULE');
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags() {
    let headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-schedule',
        attrs: {
          name: 'title',
          content: 'Class Schedule',
        },
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-schedule',
        attrs: {
          name: 'description',
          content: 'Regular CrossFit classes: Monday - Friday 6am, 7am, 12pm, 4pm, 5pm, 6pm, 7pm.',
        },
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-schedule',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        },
      },
    ];

    set(this, 'headTags', headTags);
  },
});
