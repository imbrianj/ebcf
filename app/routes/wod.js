import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = "WOD";
    Ember.$("meta[name=description]").attr("content", "EBCF Workout of the Day");
    Ember.$("meta[name=prerender-status-code]").attr("content", "200");
  },

  model: function(params) {
    return this.store.find('wod', params.wod_id);
  },

  beforeModel() {
    this.controllerFor('application').set('titleImage', 'wods');
    this.controllerFor('application').set('titleHeader', 'WOD ARCHIVE');
  }
});
