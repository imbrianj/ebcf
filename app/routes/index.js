import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      wods: this.store.query('wod', {
        filter: {
          simple: {
            date: {
              $gt: moment().subtract(3, 'days').startOf('day').toDate()
            }
          }
        }
      }),
      callout: this.store.findAll('callout')
    });
  },

  setupController(controller, model) {
    controller.set('wod', model.wods.get('lastObject'));
    controller.set('callout', model.callout.get('firstObject'));
  }

});
