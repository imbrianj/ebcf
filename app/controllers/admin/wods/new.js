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
      let wod = get(this, 'wod');
      set(wod, 'image', url);
    },
    imageUploadFailed() {
      let wod = get(this, 'wod');
      set(wod, 'image', null);
    },
  },
});
