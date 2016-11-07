import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', '');
    this.controllerFor('application').set('titleHeader', '');
  },

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
      callouts: this.store.query('callout', {
        fiter: {
          simple: {
            startDate: {
              $lt: window.moment().toDate()
            },
            endDate: {
              $gt: window.moment().toDate()
            },
            enabled: true
          }
        }
      })
    });
  },

  setupController(controller, model) {
    controller.set('wod', model.wods.sortBy('publishDate').get('lastObject'));
    var callouts = model.callouts.filter(function(callout){
      return callout.get('active') === true;
    });

    controller.set('callout', callouts.get('lastObject'));
  }
});
