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
      replace: true
    }
  },

  model(params) {
    var wods;

    if (params.tag) { // if the tag parameter is set, filter by tag
      var tag = params.tag.replace("&amp;", "&");
      wods = this.store.query('tag', {
        filter: {
          simple: {
            value: tag
          }
        }
      }).then(function(tags){
        var tag = tags.get('firstObject');
        return tag.get('enabledWods');
      });
    } else if (params.date) { // if the date parameter is set, filter by date
      var day = window.moment(params.date).utc().startOf('day').toISOString();
      wods = this.store.query('wod', {
        filter: {
          simple: {
            date: day,
            enabled: true
          },
        }
      });
    } else { // else grab the last week of workouts
      var weekAgo = window.moment().subtract(14, 'days').startOf('day').toDate();
      wods = this.store.query('wod', {
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
    }

    return Ember.RSVP.hash({
      tags: this.store.findAll('tag'),
      wods: wods
    });
  },

  beforeModel() {
    this.controllerFor('application').set('titleImage', 'wods');
    this.controllerFor('application').set('titleHeader', 'WOD ARCHIVE');
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
          content: 'Elliott Bay CrossFit Workouts of the Day Archive',
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
