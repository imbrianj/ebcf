import Ember from 'ember';

export default Ember.Component.extend({
  dateChanged: Ember.observer('wodDate', function(){
    this._disableTagPicker();
    this.sendAction('dateInputChanged', this.get('wodDate'));
  }),
  _disableDatePicker: function() {
    $('.datepicker').addClass('disabled');
    $('.clearDate').addClass('disabled');
  },
  _disableTagPicker: function() {
    $('.dropdown').addClass('disabled');
    $('.clearTags').addClass('disabled');
  },
  _enableDataPicker: function() {
    $('.datepicker').removeClass('disabled');
    $('.clearDate').removeClass('disabled');
  },
  _enableTagPicker: function() {
    $('.dropdown').removeClass('disabled');
    $('.clearTags').removeClass('disabled');
  },
  actions: {
    searchInputChanged(tagId, value) {
      this._disableDatePicker();
      this.sendAction('isSearching', tagId, value);
    },
    clearTags() {
      $('.dropdown').dropdown('clear');
      this._enableDataPicker();
      // this.set('searching', false);
      this.sendAction('isSearching', false, false);
      this.set('tag', null);
    },
    clearDate() {
      // this.set('searching', false);
      this.sendAction('isSearching', false, false);
      this.set('wodDate', '');
      this._enableTagPicker();
    }
  }
});
