import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = "Error";
    Ember.$("meta[name=prerender-status-code]").attr("content", "404"); 
  }
});
