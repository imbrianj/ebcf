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
      let wod = get(this, 'wod');
      set(wod, 'image', url);
    },
    imageUploadFailed() {
      let wod = get(this, 'wod');
      set(wod, 'image', null);
    },
  },
});
