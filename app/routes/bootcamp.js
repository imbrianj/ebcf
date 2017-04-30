import Ember from 'ember';

const {
  set,
  $,
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  activate() {
    $('#footer-menu').hide();
  },

  deactivate() {
    $('#footer-menu').show();
  },

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

  beforeModel() {
    window.scrollTo(0, 0);

    this.controllerFor('application').set('titleHeader', 'BOOT CAMP');
    this.controllerFor('application').set('titleImage', 'wods');
  },

  setupController(controller, model) {
    // controller.set('wods', model.wods);
    controller.set('tags', model.tags);

    this.controllerFor('bootcamp').get('_wodsTask').perform();
  },

  afterModel(model) {
    // $('#footer-menu').hide();
    this.setHeadTags(model);
  },

  setHeadTags() {
    let headTags = [
      {
        type: 'meta',
        tagId: 'meta-description-tag-bootcamp',
        attrs: {
          name: 'title',
          content: 'Boot Camp',
        },
      }, {
        type: 'meta',
        tagId: 'meta-title-tag-bootcamp',
        attrs: {
          name: 'description',
          content: 'Elliott Bay CrossFit Boot Camp',
        },
      }, {
        type: 'meta',
        tagId: 'prerender-status-code-wods',
        attrs: {
          name: 'prerender-status-code',
          content: '200',
        },
      },
    ];

    set(this, 'headTags', headTags);
  },
});
