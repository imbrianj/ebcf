import Ember from 'ember';

const {
  get,
  Controller
} = Ember;

export default Controller.extend({
  uploadError: false,
  error: "",
  errorText: "",
  imageUrl: "",
  showModal: false,
  notLoggedIn: true,

  init() {
    this.set('imageUrl', "https://s3-us-west-2.amazonaws.com/ebcf/assets/place-holder-image.png");
  },

  actions: {
    createPost() {
      var title = get(this, 'newTitle');
      var date = window.moment(get(this, 'newDate')).utc().startOf('day').toDate();

      var publishDay = get(this, 'newPublishDay');
      var publishTime = get(this, 'newPublishTime');
      var publishDate = window.moment(publishDay + " " + publishTime).toDate();

      var imageSource = get(this, 'imageUrl');
      var content = get(this, 'newContent');

      if (get(this, 'image-url')) {
        imageSource = get(this, 'image-url');
      }

      var post = this.store.createRecord('post', {
         enabled: true,
         title: title,
         date: date,
         publishDate: publishDate,
         image: imageSource,
         content: content
       });

       var _this = this;
       post.save().then(() => {
         _this.transitionToRoute('admin');
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
