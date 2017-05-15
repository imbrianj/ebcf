import Ember from 'ember';

const {
  get,
  set,
  Controller,
} = Ember;

export default Controller.extend({
  uploadError: false,
  tagsToRemove: [],

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
