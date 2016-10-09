import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['startDate:desc'],
  sortedCallouts: Ember.computed.sort('callouts', 'sortProps')
});
