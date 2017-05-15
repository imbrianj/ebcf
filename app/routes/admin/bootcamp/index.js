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
      bootcamps: this.store.query('bootcamp', {
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
    set(controller, 'bootcamps', model.bootcamps);
  },
});
