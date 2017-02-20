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
    bulkTagWod() {
      const strength = (get(this, 'strength') || '').toLowerCase();
      const conditioning = (get(this, 'conditioning') || '').toLowerCase();

      let possibleTags = get(this, 'tags').filter((tag) => {
        let tagValue = get(tag, 'value').toLowerCase();
        return strength.includes(tagValue) || conditioning.includes(tagValue);
      });

      possibleTags.forEach((tag) => {
        tag.get('wods').pushObject(wod);
      });
    },
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
