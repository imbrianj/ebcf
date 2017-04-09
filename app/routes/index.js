import Ember from 'ember';

const {
  set,
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  beforeModel() {
    this.controllerFor('application').set('titleImage', '');
    this.controllerFor('application').set('titleHeader', '');
  },

  model() {
    return RSVP.hash({
      wods: this.store.query('wod', {
        filter: {
          simple: {
            publishDate: {
              $gt: window.moment().subtract(3, 'days').startOf('day').toDate(),
              $lt: window.moment().toDate(),
            },
            enabled: true,
          },
        },
      }),
      callouts: this.store.query('callout', {
        fiter: {
          simple: {
            enabled: true,
          },
        },
      }),
    });
  },

  setupController(controller, model) {
    controller.set('wod', model.wods.sortBy('publishDate').get('lastObject'));
    let callouts = model.callouts.filter(function(callout) {
      return callout.get('active') === true;
    });

    controller.set('callout', callouts.get('lastObject'));
  },

  afterModel(model) {
    this.setHeadTags(model);
  },

  setHeadTags() {
    let headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-home',
        attrs: {
          name: 'title',
          content: 'Elliott Bay CrossFit',
        },
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-home',
        attrs: {
          name: 'description',
          content: 'Our mission is to help you reach your fitness and health goals. Stop in for a free class today.',
        },
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-home',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        },
      },
    ];

    set(this, 'headTags', headTags);
  },
});
