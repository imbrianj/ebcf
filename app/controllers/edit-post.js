import Ember from 'ember';

const {
  get,
  Controller
} = Ember;

export default Controller.extend({
  uploadError: false,
  tagsToRemove: [],
  imageUrl: "",
  notLoggedIn: true,
  actions: {
    updatePost() {
      var post = get(this, 'post');
      var _this = this;

      // Set wod Date
      var date = window.moment(post.get('datePickerDate')).utc().startOf('day').toDate();

      var publishDay = get(post, 'publishDay');
      var publishTime = get(post, 'publishTime');
      var publishDate = window.moment(publishDay + " " + publishTime).toDate();

      post.set('date', date);
      post.set('publishDate', publishDate);

      // Set image url if one was entered
      if (get(this, 'image-url')) {
        post.set('image', this.get('image-url'));
      }

      // Save and redirect
      post.save().then(function() {
        _this.transitionToRoute('admin');
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
