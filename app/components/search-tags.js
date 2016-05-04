import Ember from 'ember';

export default Ember.Component.extend({
  tag: null,
  disabled: false,
  setSelectionOptions: function() {
    if (this.get('tag')) {
      Ember.$('.ui.dropdown').dropdown('set text', this.get('tag'));
    }

    if (this.get('disabled')) {
      Ember.$('.ui.dropdown').addClass('disabled');
    }
  }.on('didInsertElement'),
  disableTagPicker: Ember.observer('disabled', function(){
    if (this.get('disabled')) {
      Ember.$('.ui.dropdown').addClass('disabled');
    } else {
      Ember.$('.ui.dropdown').removeClass('disabled');
    }
  }),
  actions: {
    tagsEntered: function(component, id, value) {
      if (value) {
          this.set('tag', value);
      } else {
        this.set('tag', null);
      }
    }
  }
});
