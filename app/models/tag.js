import DS from 'ember-data';

export default DS.Model.extend({
  value: DS.attr('string'),
  wods: DS.hasMany('wod', {async: true}),
  text: Ember.computed.alias('value'),
  enabledWods: Ember.computed.filterBy('wods', 'enabled', true)
});
