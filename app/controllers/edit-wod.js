import Ember from 'ember';

export default Ember.Controller.extend({
  allTags: function() {
    return this.store.findAll('tag');
  }.property('model'),
  actions: {
    updateWod(){
      this.get('model').save();
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
