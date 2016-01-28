import Ember from 'ember';

export default Ember.Component.extend({
  selectedTags: [],
  setSelectionOptions: function(){
    $('.ui.dropdown')
      .dropdown({
      allowAdditions: true
    });
  }.on('didInsertElement')
});
