import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    document.title = "Elliott Bay CrossFit";
    Ember.$("meta[name=description]").attr("content", "Our mission is to help you reach your fitness and health goals. Stop in for a free class today.");
    Ember.$("meta[name=prerender-status-code]").attr("content", "200");
  },
  model() {
    return Ember.RSVP.hash({
      wods: this.store.query('wod', {
        filter: {
          simple: {
            publishDate: {
              $gt: window.moment().subtract(3, 'days').startOf('day').toDate(),
              $lt: window.moment().toDate()
            },
            enabled: true
          }
        }
      }),
      callout: this.store.findAll('callout')
    });
  },

  setupController(controller, model) {
    controller.set('wod', model.wods.sortBy('publishDate').get('lastObject'));
    controller.set('callout', model.callout.get('firstObject'));
  }
});
