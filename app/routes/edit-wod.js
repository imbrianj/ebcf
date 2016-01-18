import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('wod', params.wod_id);
  },

  setupController(controller) {
    controller.set('tags', this.store.findAll('tag'));
  }
});
