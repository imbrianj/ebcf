import Ember from 'ember';

const {
  computed,
  Controller,
} = Ember;

export default Controller.extend({
  sortProps: ['startDate:desc'],
  sortedCallouts: computed.sort('callouts', 'sortProps')
});
