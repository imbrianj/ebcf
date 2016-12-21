import Ember from 'ember';

const {
  set,
  $,
} = Ember;

export default Ember.Route.extend({
  activate() {
    $('#footer-menu').hide();
  },

  deactivate() {
    $('#footer-menu').show();
  },

  queryParams: {
    tag: {
      replace: true,
      refreshModel: true,
    },
    date: {
      replace: true,
      refreshModel: true,
    }
  },

  model(params) {
    return Ember.RSVP.hash({
      tags: this.store.findAll('tag'),
    });
  },

  beforeModel() {
    window.scrollTo(0, 0);

    $('.video-column').hide(); // Necessary because video column was sticking

    this.controllerFor('application').set('titleHeader', 'WOD ARCHIVE');
    this.controllerFor('application').set('titleImage', 'wods');
  },

  setupController(controller, model) {
    controller.set('wods', model.wods);
    controller.set('tags', model.tags);

    this.controllerFor('wods').get('_wodsTask').perform();
  },

  afterModel(model) {
    $('#footer-menu').hide();
    this.setHeadTags(model);
  },

  setHeadTags(model) {
    var headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-wods',
        attrs: {
          name: 'title',
          content: 'Workouts of the Day',
        }
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-wods',
        attrs: {
          name: 'description',
          content: 'Elliott Bay CrossFit Workout Archive',
        }
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-wods',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        }
      }
    ];

    set(this, 'headTags', headTags);
  },
});
