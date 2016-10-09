import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = "Post";
    Ember.$("meta[name=description]").attr("content", "Post");
    Ember.$("meta[name=prerender-status-code]").attr("content", "200");
  },
  model: function(params) {
    return this.store.find('post', params.post_id);
  }
});
