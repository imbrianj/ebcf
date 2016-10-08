import DS from 'ember-data';
import Ember from 'ember';

const {
  computed
} = Ember;

export default DS.Model.extend({
  value: DS.attr('string'),
  wods: DS.hasMany('wod', {async: true}),
  text: computed.alias('value'),
  enabledWods: computed.filterBy('wods', 'enabled', true)
});
