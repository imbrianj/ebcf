import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  redirect: function() {
    this.transitionTo('admin.all-posts');
  }
});
