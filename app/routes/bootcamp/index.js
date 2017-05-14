import Ember from 'ember';

const {
  inject: {
    service,
  },
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  ajax: service(),
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

    this.get('ajax').request('/api/v1/bootcamps/count', {
      method: 'GET',
    }).then((response) => {
      controller.set('count', response.count);
    });
  },
});
