
import DS from 'ember-data';
import Ember from 'ember';

const {
  computed,
} = Ember;

const {
  attr,
  Model,
} = DS;

export default Model.extend({
  value: attr('string'),
  enabled: attr('boolean'),
  startDate: attr('date'),
  endDate: attr('date'),
  prettyStartDate: computed('startDate', function() {
    return window.moment(this.get('startDate')).tz('America/Los_Angeles').format('ddd MM.DD.YYYY h:mm a').toUpperCase();
  }),
  prettyEndDate: computed('endDate', function() {
    return window.moment(this.get('endDate')).tz('America/Los_Angeles').format('ddd MM.DD.YYYY h:mm a').toUpperCase();
  }),
  startDay: computed('startDate', function() {
    return window.moment(this.get('startDate')).startOf('day').format('YYYY-MM-DD');
  }),
  startTime: computed('startDate', function() {
    return window.moment(this.get('startDate')).format('HH:mm');
  }),
  endDay: computed('endDate', function() {
    return window.moment(this.get('endDate')).startOf('day').format('YYYY-MM-DD');
  }),
  endTime: computed('endDate', function() {
    return window.moment(this.get('endDate')).format('HH:mm');
  }),
  active: computed('startDate', 'endDate', 'enabled', function() {
    let start = this.get('startDate');
    let end = this.get('endDate');
    let enabled = this.get('enabled');

    return (window.moment(start) < window.moment()) && (window.moment(end) > window.moment() && enabled);
  }),
});
