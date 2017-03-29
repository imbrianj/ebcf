import Ember from 'ember';

const { computed, Component } = Ember;

export default Component.extend({
  disableDatePicker: computed.notEmpty('selectedTag'),
  disableTagPicker: computed.notEmpty('date'),
});
