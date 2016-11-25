import Ember from 'ember';

export default Ember.Component.extend({
  selectedTags: [],
  setSelectionOptions: function(){
    Ember.$('.ui.dropdown')
      .dropdown({
      allowAdditions: true,
      fullTextSearch: true,
    });
  }.on('didInsertElement'),
});
