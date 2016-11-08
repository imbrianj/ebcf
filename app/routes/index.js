import Ember from 'ember';

export default Ember.Route.extend({
  headTags: [{
    type: 'meta',
    tagId: 'index-description-tag',
    attrs: {
      name: 'description',
      content: 'Our mission is to help you reach your fitness and health goals. Stop in for a free class today!'
      }
    },{
      type: 'meta',
      tagId: 'index-title-tag',
      attrs: {
        name: 'title',
        content: 'Elliott Bay CrossFit'
      }
    }, {
      type: 'meta',
      tagId: 'prerender-status-code',
      attrs: {
        name: 'prerender-status-code',
        content: '200'
      },
    }
  ],

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
