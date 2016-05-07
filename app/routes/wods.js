import Ember from 'ember';

export default Ember.Route.extend({
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
      var weekAgo = window.moment().subtract(7, 'days').startOf('day').toDate();
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

  setupController(controller, model) {
    controller.set('wods', model.wods);
    controller.set('tags', model.tags);
  }
});
