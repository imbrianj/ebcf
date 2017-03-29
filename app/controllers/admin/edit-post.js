import Ember from 'ember';

const {
  get,
  set,
  Controller,
} = Ember;

export default Controller.extend({
  uploadError: false,
  tagsToRemove: [],
  notLoggedIn: true,
  actions: {
    updatePost() {
      let post = get(this, 'post');

      let date = window.moment(get(post, 'datePickerDate')).utc().startOf('day').toDate();

      let publishDay = get(post, 'publishDay');
      let publishTime = get(post, 'publishTime');
      let publishDate = window.moment(`${publishDay} ${publishTime}`).toDate();

      post.setProperties({
        date,
        publishDate,
      });

      let _this = this;
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
    },
  },
});
