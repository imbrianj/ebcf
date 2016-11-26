import Ember from 'ember';

const {
  set,
  $,
} = Ember;

export default Ember.Route.extend({
  activate: function() {
    $('#footer-menu').hide();
  },

  deactivate: function() {
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
    let weekAgo = window.moment().subtract(14, 'days').startOf('day').toDate();
    let wods = this.store.query('wod', {
      filter: {
        simple: {
          publishDate: {
            $gt: weekAgo,
            $lt: window.moment().toDate()
          },
          enabled: true
        }
      }
    });

    return Ember.RSVP.hash({
      tags: this.store.findAll('tag'),
      wods,
    });
  },

  beforeModel() {
    this.controllerFor('application').set('titleHeader', 'WOD ARCHIVE');
    this.controllerFor('application').set('titleImage', 'wods');
  },

  setupController(controller, model) {
    controller.set('wods', model.wods);
    controller.set('tags', model.tags);
  },

  afterModel(model) {
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
