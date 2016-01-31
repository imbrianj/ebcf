import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // return this.store.findAll('wod');
    var weekAgo = moment().day(-7).toDate();
    // var date = moment("2014-03-16").startOf("day").toDate();
    return Ember.RSVP.hash({
      // wods: this.store.findAll('wod'),
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
    controller.set('tags', model.tags)
  }
});
