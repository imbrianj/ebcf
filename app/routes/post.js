import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', 'wods');
    this.controllerFor('application').set('titleHeader', 'NEWS');
  },

  activate: function() {
    document.title = "Post";
    Ember.$("meta[name=description]").attr("content", "Stay up to date on EBCF news and events and find tips on nutrition, health, and training");
    Ember.$("meta[name=prerender-status-code]").attr("content", "200");
  },

  model: function(params) {
    return this.store.find('post', params.post_id);
  }
});
