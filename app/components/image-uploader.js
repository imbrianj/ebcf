import Ember from 'ember';

const {
  computed,
  get,
  set,
  Component
} = Ember;
export default Component.extend({
  classNames: ['image-uploader'],

  init() {
    this._super(...arguments);

    set(this, 'imageUrl', "https://s3-us-west-2.amazonaws.com/ebcf/assets/place-holder-image.png");
  },

  error: '',
  errorText: '',

  uploadError: computed.notEmpty('error'),
  isPlaceholderImage: computed.equal('imageUrl', 'https://s3-us-west-2.amazonaws.com/ebcf/assets/place-holder-image.png'),

  actions: {
    imageUploadComplete(url) {
      set(this, 'error', '');
      set(this, 'errorText', '');

      get(this, 'imageUploadComplete')(url);
    },

    imageUploadFailed(error, errorText){
      set(this, 'error', error);
      set(this, 'errorText', errorText);

      get(this, 'imageUploadFailed')();
    },
  }
});
