import Ember from 'ember';

const {
  set,
  $,
  Route,
} = Ember;

export default Route.extend({
  activate() {
    $('#footer-menu').hide();
  },

  deactivate() {
    $('#footer-menu').show();
  },

  beforeModel() {
    window.scrollTo(0, 0);

    this.controllerFor('application').set('titleHeader', 'WOD ARCHIVE');
    this.controllerFor('application').set('titleImage', 'wods');
  },

  afterModel(model) {
    $('#footer-menu').hide();
    this.setHeadTags(model);
  },

  setHeadTags() {
    let headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-wods',
        attrs: {
          name: 'title',
          content: 'Workouts of the Day',
        },
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-wods',
        attrs: {
          name: 'description',
          content: 'Elliott Bay CrossFit Workout Archive',
        },
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-wods',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        },
      },
    ];

    set(this, 'headTags', headTags);
  },
});
