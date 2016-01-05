import Ember from 'ember';

export default Ember.Controller.extend({
  allTags: function() {
    return this.store.findAll('tag');
  }.property('model'),
  actions: {
    updateWod(){
      var wod = this.get('model');
      var tags = this.get('newTags');
      if (tags) {
        tags.forEach(function(tag){
          wod.get("tags").pushObject(tag);
          tag.get("wods").pushObject(wod);
          tag.save();
        });
      }
      
      var self = this;
      wod.save().then(function() {
        self.transitionToRoute('wod', wod);
      });
    }
  },
  // allTags: this.store.get('tags'),
  // wodTags: [],
  setTagsForSelect: function(){
    // var tagsForSelect = this.get('targetObject.store') - this.get('model').get('tags');
    // var tagsForSelect =
    // this.set('wodTags', this.get('model').get('tags'));
  }.on('init')
});
