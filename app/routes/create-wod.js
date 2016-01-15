import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      tags: this.store.findAll('tag')
    });
  },

  setupController(controller, model) {
    controller.set('tags', model.tags);
  }
});
