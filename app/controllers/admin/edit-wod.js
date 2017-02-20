import Ember from 'ember';

const {
  get,
  set,
  $,
  Controller,
} = Ember;

export default Controller.extend({
  uploadError: false,
  tagsToRemove: [],

  actions: {
    updateWod() {
      let wod = get(this, 'wod');
      let _this = this;

      // Add new tags
      let dropdownValues = $('.ui.dropdown').dropdown('get value');
      let tagIds = [];

      if (typeof dropdownValues === 'string') {
        tagIds = dropdownValues.split(',');
      }

      tagIds.forEach(function(tagId) {
        let tag = _this.store.peekRecord('tag', tagId);

        if (tag) {
          get(tag, 'wods').pushObject(wod);
          tag.save();
        } else {
          let newTag = _this.store.createRecord('tag', {
            value: tagId,
          });
          newTag.save().then(function() {
            get(newTag, 'wods').pushObject(wod);
            newTag.save();
            wod.save();
          });
        }
      });

      let date = window.moment(get(wod, 'datePickerDate')).utc().startOf('day').toDate();

      let publishDay = get(wod, 'publishDay');
      let publishTime = get(wod, 'publishTime');
      let publishDate = window.moment(`${publishDay} ${publishTime}`).toDate();

      wod.setProperties({
        date,
        publishDate,
      });

      // Save and redirect
      wod.save().then(function() {
        _this.transitionToRoute('admin.all-wods');
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
    removeTag(tag) {
      let wod = get(this, 'wod');
      get(wod, 'tags').removeObject(tag);
      tag.save();
      wod.save();
    },
  },
});
