import Ember from 'ember';

const {
  get,
  inject,
  set,
  $,
  Controller
} = Ember;

export default Controller.extend({
  store: inject.service(),
  enabled: true,

  actions: {
    createWod() {
      let enabled = get(this, 'enabled');

      let date = window.moment(get(this, 'date')).utc().startOf('day').toDate();

      let publishDay = get(this, 'publishDay');
      let publishTime = get(this, 'publishTime');
      let publishDate = window.moment(publishDay + " " + publishTime).toDate();

      let strength = get(this, 'strength');
      let conditioning = get(this, 'conditioning');

      let image = get(this, 'image');

      let videoId = get(this, 'videoId');
      let description = get(this, 'description');

      let wod = this.store.createRecord('wod', {
        enabled: enabled,
        date: date,
        publishDate: publishDate,
        strength: strength,
        conditioning: conditioning,
        image: image,
        videoId: videoId,
        description: description
      });

      wod.save().then((wod) => {
        this._createWodTags(wod);
      });
    },
    imageUploadComplete(url) {
      set(this, 'image', url);
    },
    imageUploadFailed(){
      set(this, 'image', null);
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
      set(this, 'notLoggedIn', false);
    },
    createATag(tagValue) {
      let tag = this.store.createRecord('tag', {
         value: tagValue
       });
       tag.save();
    }
  },

  _createWodTags(wod) {
    let dropdownValues = $('.ui.dropdown').dropdown('get value');
    let tagIds = [];

    if (typeof dropdownValues === 'string') {
      tagIds = dropdownValues.split(",");
    }

    let _this = this;

    tagIds.forEach(function(tagId) {
      let store = get(_this, 'store');
      let tag = store.peekRecord('tag', tagId);

      if (tag) {
        tag.get("wods").pushObject(wod);
        tag.save();
        wod.save();
      } else {
        let newTag = store.createRecord('tag', {
          value: tagId
        });

        newTag.save().then(function() {
          newTag.get("wods").pushObject(wod);
          newTag.save();
          wod.save();
        });
      }
    });

    this.transitionToRoute('admin.all-wods');
  }

});
