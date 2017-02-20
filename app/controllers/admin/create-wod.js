import Ember from 'ember';

const {
  get,
  inject,
  set,
  $,
  Controller,
} = Ember;

export default Controller.extend({
  store: inject.service(),
  enabled: true,

  actions: {
    imageUploadComplete(url) {
      let wod = get(this, 'wod');
      set(wod, 'image', url);
    },
    imageUploadFailed() {
      let wod = get(this, 'wod');
      set(wod, 'image', null);
    },
    openModal() {
      $('#tag-modal').modal('show');
    },
    close(tagValue) {
      if (tagValue) {
        this.send('createATag', tagValue);
      }
    },
    logIn() {
      set(this, 'notLoggedIn', false);
    },
    createATag(tagValue) {
      let tag = this.store.createRecord('tag', {
        value: tagValue,
      });
      tag.save();
    },
  },

  _createWodTags(wod) {
    let dropdownValues = $('.ui.dropdown').dropdown('get value');
    let tagIds = [];

    if (typeof dropdownValues === 'string') {
      tagIds = dropdownValues.split(',');
    }

    let _this = this;

    tagIds.forEach(function(tagId) {
      let store = get(_this, 'store');
      let tag = store.peekRecord('tag', tagId);

      if (tag) {
        tag.get('wods').pushObject(wod);
        tag.save();
        wod.save();
      } else {
        let newTag = store.createRecord('tag', {
          value: tagId,
        });

        newTag.save().then(function() {
          newTag.get('wods').pushObject(wod);
          newTag.save();
          wod.save();
        });
      }
    });

    this.transitionToRoute('admin.all-wods');
  },
});
