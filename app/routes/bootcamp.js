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

  beforeModel() {
    window.scrollTo(0, 0);

    this.controllerFor('application').set('titleHeader', 'BOOT CAMP');
    this.controllerFor('application').set('titleImage', 'wods');
  },

  afterModel(model) {
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
