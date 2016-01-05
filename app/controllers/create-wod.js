import Ember from 'ember';

export default Ember.Controller.extend({
  // selectedTags: [],
  imageUrl: "",
  actions: {
    createWod() {
     var title = this.get('newTitle');
     var date = moment().toDate(this.get('newDate'));
     var strength = this.get('newStrength');
     var conditioning = this.get('newConditioning');
     var imageSource = this.get('imageUrl');

     var wod = this.store.createRecord('wod', {
        title: title,
        date: date,
        strength: strength,
        conditioning: conditioning,
        image: imageSource,
      });

      var tags = this.get('tagsForWod');
      tags.forEach(function(tag){
        wod.get("tags").pushObject(tag);
      });

      wod.save().then(function(){
        tags.forEach(function(tag){
          tag.get("wods").pushObject(wod);
          tag.save();
        });
      });

    },
    imageUploadComplete(url) {
      this.set('imageUrl', url);
    },
    createTag(text) {
      // var tag = this.store.createRecord('tag', {
      //   value: text
      // });
      // tag.save();
      // // this.get('selectedTags').pushObject(tag);
      // this.set('selectedTags', [tag]);
      // debugger;

      // .val(text);
    }
  }
});
