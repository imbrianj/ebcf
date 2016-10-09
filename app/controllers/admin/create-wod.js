import Ember from 'ember';

export default Ember.Controller.extend({
  uploadError: false,
  error: "",
  errorText: "",
  imageUrl: "",
  showModal: false,
  notLoggedIn: true,
  setImagePreview: function(){
    this.set('imageUrl', "https://s3-us-west-2.amazonaws.com/ebcf/assets/place-holder-image.png");
  }.on('init'),
  actions: {
    createWod() {
     var date = window.moment(this.get('newDate')).utc().startOf('day').toDate();
     var publishDay = this.get('newPublishDay');
     var publishTime = this.get('newPublishTime');
     var publishDate = window.moment(publishDay + " " + publishTime).toDate();
     var strength = this.get('newStrength');
     var conditioning = this.get('newConditioning');
     var imageSource = this.get('imageUrl');
     var videoId = this.get('newVideoId');
     var description = this.get('newDescription');

     if (this.get('image-url')) {
       imageSource = this.get('image-url');
     }

     var wod = this.store.createRecord('wod', {
        enabled: true,
        date: date,
        publishDate: publishDate,
        strength: strength,
        conditioning: conditioning,
        image: imageSource,
        video_id: videoId,
        description: description
      });

      var _this = this;
      wod.save().then( function(){
        var dropdownValues = Ember.$('.ui.dropdown').dropdown('get value');
        var tagIds = [];

        if (typeof dropdownValues === 'string') {
          tagIds = dropdownValues.split(",");
        }

        tagIds.forEach(function(tagId){
          var tag = _this.store.peekRecord('tag', tagId);

          if(tag) {
            tag.get("wods").pushObject(wod);
            tag.save();
            wod.save();
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

        _this.transitionToRoute('admin.all-wods');
      });
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
      Ember.$('#tag-modal').modal('show');
    },
    close(tagValue) {
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
