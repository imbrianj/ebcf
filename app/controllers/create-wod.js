import Ember from 'ember';

export default Ember.Controller.extend({
  uploadError: false,
  error: "",
  errorText: "",
  imageUrl: "",
  showModal: false,
  notLoggedIn: true,
  setImagePreview: function(){
    this.set('imageUrl', "/assets/place-holder-image.png");
  }.on('init'),
  actions: {
    createWod() {
     var title = this.get('newTitle');
     var date = moment(this.get('newDate')).toDate();
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
      if (tags) {
        tags.forEach(function(tag){
          wod.get("tags").pushObject(tag);
        });
      }

      wod.save().then(function(){
        if (tags) {
          tags.forEach(function(tag){
            tag.get("wods").pushObject(wod);
            tag.save();
          });
        }
      });

      this.transitionToRoute('wod', wod);

    },
    imageUploadComplete(url) {
      this.set('uploadError', false);
      this.set('imageUrl', url);
    },
    imageUploadFailed(error, errorText){
      this.set('uploadError', true);
      this.set('error', error);
      this.set('errorText', errorText);
    },
    openModal() {
      $('#tag-modal').modal('show');
    },
    close(tagValue) {
      // this.set('showModal', false);
      if (tagValue) {
        this.send('createATag', tagValue);
      }
    },
    logIn() {
      this.set('notLoggedIn', false);
    },
    createATag(tagValue) {
      var tag = this.store.createRecord('tag', {
         value: tagValue
       });
       tag.save();
    }
  }
});
