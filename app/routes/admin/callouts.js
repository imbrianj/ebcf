import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      callouts: this.store.findAll('callout')
    });
  },
  setupController(controller, model) {
    controller.set('callouts', model.callouts);
  }
});
