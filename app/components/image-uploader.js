import Ember from 'ember';

const {
  computed,
  get,
  set,
  Component
} = Ember;
export default Component.extend({
  classNames: ['image-uploader'],

  error: '',
  errorText: '',

  uploadError: computed.notEmpty('error'),
  isPlaceholderImage: computed.equal('imageUrl', '/assets/place-holder-image.png'),

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
