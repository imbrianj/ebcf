import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', 'getting-started');
    this.controllerFor('application').set('titleHeader', 'GETTING STARTED');
  },

  activate: function() {
    document.title = "Getting Started";
    Ember.$("meta[name=description]").attr("content", "On this page you’ll find information about the sport of CrossFit, classes we offer, and how to sign up.");
    Ember.$("meta[name=prerender-status-code]").attr("content", "200");
  }
});
