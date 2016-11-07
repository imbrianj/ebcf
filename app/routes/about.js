import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', 'about');
    this.controllerFor('application').set('titleHeader', 'ABOUT US');
  },

  activate: function() {
    document.title = "About Us";
    Ember.$("meta[name=description]").attr("content", "We are focused on providing the best possible environment for people of all fitness levels to help them live a healthier life style.");
    Ember.$("meta[name=prerender-status-code]").attr("content", "200");
  }
});
