import Ember from 'ember';

const {
  set,
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  model(params) {
    return RSVP.hash({
      post: this.store.find('post', params.post_id),
    });
  },

  setupController(controller, model) {
    set(controller, 'post', model.post);
  },
});
