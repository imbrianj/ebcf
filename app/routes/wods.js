import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      wods: this.store.findAll('wod'),
      tags: this.store.findAll('tag')
    });
  },

  setupController(controller, model) {
    controller.set('wods', model.wods);
    controller.set('tags', model.tags)
  }
});
