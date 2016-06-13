
import DS from 'ember-data';

export default DS.Model.extend({
  value: DS.attr('string'),
  enabled: DS.attr('boolean'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  prettyStartDate: Ember.computed('startDate', function(){
    return window.moment(this.get('startDate')).tz("America/Los_Angeles").format('ddd MM.DD.YYYY h:mm a').toUpperCase();
  }),
  prettyEndDate: Ember.computed('endDate', function(){
    return window.moment(this.get('endDate')).tz("America/Los_Angeles").format('ddd MM.DD.YYYY h:mm a').toUpperCase();
  }),
  startDay: Ember.computed('startDate', function() {
    return window.moment(this.get('startDate')).startOf('day').format('YYYY-MM-DD');
  }),
  startTime: Ember.computed('startDate', function() {
    return window.moment(this.get('startDate')).format('HH:mm');
  }),
  endDay: Ember.computed('endDate', function() {
    return window.moment(this.get('endDate')).startOf('day').format('YYYY-MM-DD');
  }),
  endTime: Ember.computed('endDate', function() {
    return window.moment(this.get('endDate')).format('HH:mm');
  }),
  active: Ember.computed('startDate', 'endDate', 'enabled', function() {
    var start = this.get('startDate');
    var end = this.get('endDate');
    var enabled = this.get('enabled');

    return (window.moment(start) < window.moment()) && (window.moment(end) > window.moment() && enabled);
  })
});
