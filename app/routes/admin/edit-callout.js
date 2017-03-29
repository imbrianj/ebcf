import Ember from 'ember';

const {
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  model(params) {
    return RSVP.hash({
      callout: this.store.find('callout', params.callout_id),
    });
  },
  setupController(controller, model) {
    controller.set('callout', model.callout);
  },
});
