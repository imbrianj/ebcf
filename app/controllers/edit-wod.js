import Ember from 'ember';

export default Ember.Controller.extend({
  uploadError: false,
  tagsToRemove: [],
  imageUrl: "",
  notLoggedIn: true,
  actions: {
    updateWod() {
      var wod = this.get('wod');

      // Add new tags
      var dropdownValues = $('.ui.dropdown').dropdown('get value');
      var tagValues = [];

      if (typeof dropdownValues === 'string') {
        tagValues = dropdownValues.split(",");
      }

      tagValues.forEach(tagValue => {
        this.get('store').queryRecord('tag', {
          filter: {
            simple: {
              value: tagValue
            }
          }
        }).then(tag => {
            if (tag.length > 0) {
              tag[0].get("wods").pushObject(wod);
              wod.get("tags").pushObject(tag[0]);

              tag[0].save();
              wod.save();
            } else {
              var newTag = this.store.createRecord('tag', {
                 value: tagValue
               });
               newTag.save().then( function() {
                 newTag.get('wods').pushObject(wod);
                 wod.get('tags').pushObject(newTag);
                 wod.save();
                 newTag.save();
               });
            }
        });
      });

      // Remove tags
      var tagsToRemove = this.get('tagsToRemove');

      if (tagsToRemove.length > 0) {
        tagsToRemove.forEach(function(tag){
          tag.get('wods').removeObject(wod);
          tag.save();
        });
      }

      // Set wod Date
      var date = moment(wod.get('datePickerDate')).toDate();
      wod.set('date', date);

      // Save and redirect
      var self = this;
      wod.save().then(function() {
        self.transitionToRoute('wod', wod);
      });
    },
    removeTag(tag) {
      var wod = this.get('wod');
      var wodTags = wod.get('tags');
      wodTags.removeObject(tag);
      var tagsToRemove = this.get('tagsToRemove').pushObject(tag);
      this.set('tagsToRemove', tagsToRemove);
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
    },
    update_selected: function(component, id, value) {
       this.set('selectedAction', id);
     }
  }
});
