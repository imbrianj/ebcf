import Ember from 'ember';

export default Ember.Controller.extend({
  uploadError: false,
  error: "",
  errorText: "",
  imageUrl: "",
  showModal: false,
  notLoggedIn: true,
  setImagePreview: function(){
    this.set('imageUrl', "/assets/place-holder-image.png");
  }.on('init'),
  actions: {
    createWod() {
     var title = this.get('newTitle');
     var date = moment(this.get('newDate')).toDate();
     var strength = this.get('newStrength');
     var conditioning = this.get('newConditioning');
     var imageSource = this.get('imageUrl');

     var wod = this.store.createRecord('wod', {
        title: title,
        date: date,
        strength: strength,
        conditioning: conditioning,
        image: imageSource,
      });

      var _this = this;
      wod.save().then( function(){
        var dropdownValues = $('.ui.dropdown').dropdown('get value');
        var tagValues = [];

        if (typeof dropdownValues === 'string') {
          tagValues = dropdownValues.split(",");
        }

        tagValues.forEach(tagValue => {
          _this.get('store').queryRecord('tag', {
            filter: {
              simple: {
                value: tagValue
              }
            }
          }).then(tag => {
              if (tag.length > 0) {
                wod.get("tags").pushObject(tag[0]);
                wod.save();
                tag[0].get("wods").pushObject(wod);
                tag[0].save();
              } else {
                var newTag = _this.store.createRecord('tag', {
                   value: tagValue
                 });
                 newTag.save().then( function() {
                   wod.get('tags').pushObject(newTag);
                   wod.save();
                   newTag.get('wods').pushObject(wod);
                   newTag.save();
                 });
              }
          });
        });
        _this.transitionToRoute('wod', wod);
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
      $('#tag-modal').modal('show');
    },
    close(tagValue) {
      // this.set('showModal', false);
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
