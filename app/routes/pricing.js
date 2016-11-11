import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = "Pricing";
    Ember.$("meta[name=description]").attr("content", "We charge month to month, with no long-term commitments required.");
    Ember.$("meta[name=prerender-status-code]").attr("content", "200");
  }
});
