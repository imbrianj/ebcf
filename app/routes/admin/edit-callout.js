import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      callout: this.store.find('callout', params.callout_id)
    });
  },
  setupController(controller, model) {
    controller.set('callout', model.callout);
  }
});
