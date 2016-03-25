import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      callouts: this.store.findAll('callout')
    });

  },

  setupController(controller, model) {
    controller.set('callout', model.callouts.get('firstObject'));
  }
});
