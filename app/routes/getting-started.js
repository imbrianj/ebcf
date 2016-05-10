import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = "Getting Started";
    Ember.$("meta[name=description]").attr("content", "On this page you’ll find information about the sport of CrossFit, classes we offer, and how to sign up."); 
  }
});
