import Ember from 'ember';

const {
  RSVP,
  Route,
} = Ember;

export default Route.extend({
  model() {
    return RSVP.hash({
      callouts: this.store.findAll('callout'),
    });
  },
  setupController(controller, model) {
    controller.set('callouts', model.callouts);
  },
});
