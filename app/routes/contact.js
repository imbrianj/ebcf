import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', '');
    this.controllerFor('application').set('titleHeader', '');
  },

  activate: function() {
    document.title = "Contact Us";
    Ember.$("meta[name=description]").attr("content", "You can find us in-between 2nd and 3rd on Bell Street");
    Ember.$("meta[name=prerender-status-code]").attr("content", "200");
  }
});
