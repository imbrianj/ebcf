import Ember from 'ember';

const {
  get,
  set,
  $,
  Controller
} = Ember;

export default Controller.extend({
  uploadError: false,
  tagsToRemove: [],

  actions: {
    updateWod() {
      var wod = this.get('wod');
      var _this = this;

      // Add new tags
      var dropdownValues = $('.ui.dropdown').dropdown('get value');
      var tagIds = [];

      if (typeof dropdownValues === 'string') {
        tagIds = dropdownValues.split(",");
      }

      tagIds.forEach(function(tagId){
        var tag = _this.store.peekRecord('tag', tagId);

        if(tag) {
          tag.get("wods").pushObject(wod);
          tag.save();
        } else {
          var newTag = _this.store.createRecord('tag', {
            value: tagId
          });
          newTag.save().then(function() {
            newTag.get("wods").pushObject(wod);
            newTag.save();
            wod.save();
          });
        }
      });

      var date = window.moment(get(wod, 'datePickerDate')).utc().startOf('day').toDate();

      var publishDay = get(wod, 'publishDay');
      var publishTime = get(wod, 'publishTime');
      var publishDate = window.moment(publishDay + " " + publishTime).toDate();

      wod.setProperties({
        date: date,
        publishDate: publishDate,
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
      var wod = this.get('wod');
      wod.get('tags').removeObject(tag);
      tag.save();
      wod.save();
    }
  }
});
