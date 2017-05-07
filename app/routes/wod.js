import Ember from 'ember';

const {
  Route,
} = Ember;

export default Route.extend({
  redirect(model) {
    this.transitionTo('wods.wod', model.id);
  },
});
