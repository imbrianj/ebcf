import Ember from 'ember';

export default Ember.Component.extend({
  tag: null,
  date: null,
  disableDatePicker: Ember.computed('tag', function(){
    return !!this.get('tag');
  }),
  disableTagPicker: Ember.computed('date', function(){
    return !!this.get('date');
  }),
  actions: {
    clearTags() {
      this.set('tag', null);
      Ember.$('.dropdown').dropdown('clear');
    },
    clearDate() {
      this.set('date', null);
    }
  }
});
