import Ember from 'ember';

const {
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  queryParams: {
    tag: {
      replace: true,
      refreshModel: true,
    },
    date: {
      replace: true,
      refreshModel: true,
    },
  },

  model() {
    return RSVP.hash({
      tags: this.store.findAll('tag'),
    });
  },

  setupController(controller, model) {
    controller.set('tags', model.tags);

    controller.get('_wodsTask').perform();
  },
});
