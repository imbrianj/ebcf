import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      post: this.store.find('post', params.post_id),
    });
  },

  setupController(controller, model) {
    controller.set('post', model.post);
  }
});
