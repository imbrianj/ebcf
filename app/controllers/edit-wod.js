import Ember from 'ember';

export default Ember.Controller.extend({
  uploadError: false,
  allTags: function() {
    // var tags = this.store.findAll('tag').then(function(){
    //   var wod_tags = this.get('model').get('tags');
    //   var selectable_tags = tags.filter(function(i) {
    //     return wod_tags.indexOf(i) < 0;
    //   });
    //   debugger;
    //   return selectable_tags;
    //
    // });
    return this.store.findAll('tag');

  }.property('model'),
  tagsIdsToRemove: [],
  imageUrl: "",
  notLoggedIn: true,
  actions: {
    updateWod() {
      var wod = this.get('wod');
      var tags = this.get('newTags');
      var tags_to_remove = this.get('tagsIdsToRemove');

      var date = moment(wod.get('datePickerDate')).toDate();
      debugger;
      wod.set('date', date);

      var image = wod.get('image');
      // wod.set('image', image);

      if (tags_to_remove) {
        tags_to_remove.forEach(function(tag){
          tag.get('wods').removeObject(wod);
          tag.save();
        });
      }
      if (tags) {
        tags.forEach(function(tag){
          wod.get("tags").pushObject(tag);
          tag.get("wods").pushObject(wod);
          tag.save();
        });
      }
      var self = this;
      wod.save().then(function() {
        self.transitionToRoute('wod', wod);
      });
    },
    removeTag(tag) {
      var wod = this.get('wod');
      var tags = wod.get('tags');
      tags.removeObject(tag);
      var new_tags_to_remove = this.get('tagsIdsToRemove').pushObject(tag);
      this.set('tagsToRemove', new_tags_to_remove);
      // var new_tags = wod_tags.filter(function(i) {return [tag].indexOf(i) < 0;});
    },
    imageUploadComplete(url) {
      // this.set('imageUrl', url);
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
