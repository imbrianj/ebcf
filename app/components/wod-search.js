import Ember from 'ember';

export default Ember.Component.extend({
  disableDatePicker: Ember.computed.notEmpty('selectedTag'),
  disableTagPicker: Ember.computed.notEmpty('date'),
});
