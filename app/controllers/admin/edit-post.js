import Ember from 'ember';

const {
  get,
  set,
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

      var title = get(this, 'title');
      var date = window.moment(get(this, 'date')).utc().startOf('day').toDate();

      var publishDay = get(this, 'publishDay');
      var publishTime = get(this, 'publishTime');
      var publishDate = window.moment(publishDay + " " + publishTime).toDate();

      var bannerImage = get(this, 'bannerImage');
      var contentImage = get(this, 'contentImage');

      var content = get(this, 'content');

      post.setProperties({
        enabled: true,
        title: title,
        date: date,
        publishDate: publishDate,
        contentImage: contentImage,
        bannerImage: bannerImage,
        content: content
      });

       var _this = this;
       post.save().then(() => {
         _this.transitionToRoute('admin.all-posts');
       });
    },

    bannerImageUploadComplete(url) {
      set(this, 'bannerImage', url);
    },
    bannerImageUploadFailed() {
      set(this, 'bannerImage', null);
    },

    contentImageUploadComplete(url) {
      set(this, 'contentImage', url);
    },
    contentImageUploadFailed() {
      set(this, 'contentImage', null);
    },

    logIn() {
      set(this, 'notLoggedIn', false);
    }
  }
});
