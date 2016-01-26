import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      wod: this.store.find('wod', params.wod_id),
      tags: this.store.findAll('tag')
    });

  },

  setupController(controller, model) {
    controller.set('tags', model.tags);
    controller.set('wod', model.wod);
  }
});
