import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = "Contact Us";
    Ember.$("meta[name=description]").attr("content", "You can find us in-between 2nd and 3rd on Bell Street"); 
  }
});
