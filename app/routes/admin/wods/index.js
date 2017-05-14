import Ember from 'ember';

const {
  set,
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  model() {
    let weekAgo = window.moment().subtract(7, 'days').startOf('day').toDate();
    return RSVP.hash({
      wods: this.store.query('wod', {
        filter: {
          simple: {
            date: {
              $gt: weekAgo,
            },
          },
        },
      }),
    });
  },
  setupController(controller, model) {
    set(controller, 'wods', model.wods);
  },
});
