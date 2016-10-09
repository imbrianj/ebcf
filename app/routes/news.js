import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = "EBCF News";
    Ember.$("meta[name=prerender-status-code]").attr("content", "200");
  },

  model() {
    return Ember.RSVP.hash({
      posts: this.store.findAll('post'),
    });
  },

  setupController(controller, model) {
    controller.set('posts', model.posts);
  }
});
