import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      tags: this.store.findAll('tag'),
      wods: this.store.findAll('wod'),
      // missing: Ember.$.getJSON("missed_tags.json")
      wodJson: Ember.$.getJSON("wod_numbers.json")
    });
  },

  setupController(controller, model) {
    controller.set('wods', model.wods);
    controller.set('tags', model.tags);
    controller.set('wodJson', model.wodJson);
    // controller.set('missing', model.missing);
  }
});
