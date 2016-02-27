import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  date: DS.attr('date'),
  image: DS.attr('string'),
  strength: DS.attr('string'),
  conditioning: DS.attr('string'),
  description: DS.attr('string'),
  tags: DS.hasMany('tag', {async: true}),

  prettyDate: Ember.computed('date', function() {
    return moment(this.get('date')).utc().format('ddd MM.DD.YYYY').toUpperCase();
  }),
  datePickerDate: Ember.computed('date', function() {
    return moment(this.get('date')).utc().format('YYYY-MM-DD');
  })
});
