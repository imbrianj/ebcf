import Ember from 'ember';

const { Component, $ } = Ember;

export default Component.extend({
  selectedTags: [],
  setSelectionOptions: function() {
    $('.ui.dropdown')
      .dropdown({
        allowAdditions: true,
        fullTextSearch: true,
      });
  }.on('didInsertElement'),
});
