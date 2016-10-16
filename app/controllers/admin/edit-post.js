import Ember from 'ember';

const {
  get,
  set,
  Controller
} = Ember;

export default Controller.extend({
  uploadError: false,
  tagsToRemove: [],
  notLoggedIn: true,
  actions: {
    updatePost() {
      var post = get(this, 'post');

      var enabled = get(this, 'enabled');
      var title = get(this, 'title');
      var date = window.moment(get(this, 'date')).utc().startOf('day').toDate();

      var publishDay = get(this, 'publishDay');
      var publishTime = get(this, 'publishTime');
      var publishDate = window.moment(publishDay + " " + publishTime).toDate();

      var bannerImage = get(this, 'bannerImage');
      var contentImage = get(this, 'contentImage');

      var content = get(this, 'content');

      post.setProperties({
        enabled: enabled,
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
      let post = get(this, 'post');
      set(post, 'bannerImage', url);
    },
    bannerImageUploadFailed() {
      let post = get(this, 'post');
      set(post, 'bannerImage', null);
    },

    contentImageUploadComplete(url) {
      let post = get(this, 'post');
      set(post, 'contentImage', url);
    },
    contentImageUploadFailed() {
      let post = get(this, 'post');
      set(post, 'contentImage', null);
    },

    logIn() {
      set(this, 'notLoggedIn', false);
    }
  }
});
