import DS from 'ember-data';
import Ember from 'ember';

const {
  computed,
} = Ember;

const {
  attr,
  hasMany,
  Model,
} = DS;

export default Model.extend({
  value: attr('string'),
  wods: hasMany('wod', { async: true }),
  text: computed.alias('value'),
  enabledWods: computed.filterBy('wods', 'enabled', true),
});
