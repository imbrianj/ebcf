import Ember from 'ember';

export default Ember.Controller.extend({
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
  actions: {
    updateWod() {
      var wod = this.get('model');
      var tags = this.get('newTags');
      var tags_to_remove = this.get('tagsIdsToRemove');

      var date = moment().toDate(wod.get('date'));
      wod.set('date', date);

      var image = this.get('imageUrl');
      wod.set('image', image);
      
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
      var wod = this.get('model');
      var tags = wod.get('tags');
      tags.removeObject(tag);
      var new_tags_to_remove = this.get('tagsIdsToRemove').pushObject(tag);
      this.set('tagsToRemove', new_tags_to_remove);
      // var new_tags = wod_tags.filter(function(i) {return [tag].indexOf(i) < 0;});
    },
    imageUploadComplete(url) {
      this.set('imageUrl', url);
    }
  }
});
