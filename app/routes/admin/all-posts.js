import Ember from 'ember';

const {
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  model() {
    return RSVP.hash({
      posts: this.store.findAll('post'),
    });
  },

  setupController(controller, model) {
    controller.set('posts', model.posts);
  },
});
