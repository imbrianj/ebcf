import Ember from 'ember';

export default Ember.Route.extend({
  setupController() {
    this.controllerFor('application').set('titleImage', '');
    this.controllerFor('application').set('titleHeader', '');
  },
  activate: function() {
    document.title = "Error";
    Ember.$("meta[name=prerender-status-code]").attr("content", "404");
  }
});
