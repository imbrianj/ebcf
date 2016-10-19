import Ember from 'ember';

const {
  get,
  Route
} = Ember;

export default Ember.Route.extend({
  redirect: function() {
    this.transitionTo('admin.all-wods');
  }
});
