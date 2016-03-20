import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var weekAgo = moment().subtract(7, 'days').startOf('day').toDate();
    return Ember.RSVP.hash({
      tags: this.store.findAll('tag'),
      wods: this.store.query('wod', {
        filter: {
          simple: {
            date: {
              $gt: weekAgo
            }
          }
        }
      })
    });
  },

  setupController(controller, model) {
    controller.set('wods', model.wods);
    controller.set('tags', model.tags);
  }
});
