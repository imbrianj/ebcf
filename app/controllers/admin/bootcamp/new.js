import Ember from 'ember';

const {
  get,
  inject,
  set,
  Controller,
} = Ember;

export default Controller.extend({
  store: inject.service(),
  enabled: true,

  actions: {
    imageUploadComplete(url) {
      let bootcamp = get(this, 'bootcamp');
      set(bootcamp, 'image', url);
    },
    imageUploadFailed() {
      let bootcamp = get(this, 'bootcamp');
      set(bootcamp, 'image', null);
    },
  },
});
