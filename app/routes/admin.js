import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var weekAgo = window.moment().subtract(7, 'days').startOf('day').toDate();
    return Ember.RSVP.hash({
      wods: this.store.query('wod', {
        filter: {
          simple: {
            publishDate: {
              $gt: weekAgo,
              $lt: window.moment().toDate()
            }
          }
        }
      })
    });
  },
  setupController(controller, model) {
    controller.set('wods', model.wods);
  }
});
