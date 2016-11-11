import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = "Schedule";
    Ember.$("meta[name=description]").attr("content", "Regular classes: Monday - Friday 6am, 7am, 8am, 12pm, 4pm, 5pm, 6pm, 7pm");
    Ember.$("meta[name=prerender-status-code]").attr("content", "200");
  }
});
