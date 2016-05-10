import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      wods: this.store.query('wod', {
        filter: {
          simple: {
            publishDate: {
              $gt: window.moment().subtract(3, 'days').startOf('day').toDate(),
              $lt: window.moment().toDate()
            },
            enabled: true
          }
        }
      }),
      callout: this.store.findAll('callout')
    });
  },

  setupController(controller, model) {
    controller.set('wod', model.wods.sortBy('publishDate').get('lastObject'));
    controller.set('callout', model.callout.get('firstObject'));
  }
});
