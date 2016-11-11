import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = "Our Coaches";
    Ember.$("meta[name=description]").attr("content", "We have knowledgeable and experienced coaches who know how to drive results.");
    Ember.$("meta[name=prerender-status-code]").attr("content", "200");
  },
});
