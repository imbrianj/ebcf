import Ember from 'ember';

const {
  Route,
} = Ember;

export default Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', 'wods');
    this.controllerFor('application').set('titleHeader', 'ADMIN');
  },
});
