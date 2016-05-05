import Ember from 'ember';

export default Ember.Controller.extend({
  uploadError: false,
  tagsToRemove: [],
  imageUrl: "",
  notLoggedIn: true,
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

      // Set wod Date
      var date = window.moment(wod.get('datePickerDate')).utc().startOf('day').toDate();

      var publishDay = wod.get('publishDay');
      var publishTime = wod.get('publishTime');
      var publishDate = window.moment(publishDay + " " + publishTime).toDate();

      wod.set('date', date);
      wod.set('publishDate', publishDate);

      // Set image url if one was entered
      if (this.get('image-url')) {
        wod.set('image', this.get('image-url'));
      }

      // Save and redirect
      wod.save().then(function() {
        _this.transitionToRoute('wod', wod);
      });
    },
    deleteWod() {
      var wod = this.get('wod');
      var self = this;
      var tags = wod.get('tags');
      tags.forEach( function(tag) {
        tag.get('wods').removeObject(wod);
        tag.save();
      });

      wod.destroyRecord().then(function(){
        self.transitionTo('wods');
      });
    },
    removeTag(tag) {
      var wod = this.get('wod');
      wod.get('tags').removeObject(tag);
      tag.save();
      wod.save();
    },
    imageUploadComplete(url) {
      this.set('uploadError', false);
      this.get('wod').set('image', url);
    },
    imageUploadFailed(error, errorText){
      this.set('uploadError', true);
      this.set('error', error);
      this.set('errorText', errorText);
    },
    logIn() {
      this.set('notLoggedIn', false);
    }
  }
});
