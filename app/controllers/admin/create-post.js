import Ember from 'ember';

const {
  get,
  set,
  Controller,
} = Ember;

export default Controller.extend({
  enabled: true,

  actions: {
    createPost() {
      let enabled = get(this, 'enabled');
      let title = get(this, 'title');
      let date = window.moment(get(this, 'date')).utc().startOf('day').toDate();

      let publishDay = get(this, 'publishDay');
      let publishTime = get(this, 'publishTime');
      let publishDate = window.moment(`${publishDay} ${publishTime}`).toDate();

      let bannerImage = get(this, 'bannerImage');
      let contentImage = get(this, 'contentImage');

      let content = get(this, 'content');

      let post = this.store.createRecord('post', {
        enabled,
        title,
        date,
        publishDate,
        contentImage,
        bannerImage,
        content,
      });

      let _this = this;
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
    },
  },
});
