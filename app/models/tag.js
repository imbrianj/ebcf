import DS from 'ember-data';

export default DS.Model.extend({
  value: DS.attr('string'),
  wods: DS.hasMany('wod', {async: true})
});
