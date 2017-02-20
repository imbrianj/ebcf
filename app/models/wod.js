import DS from 'ember-data';
import Ember from 'ember';
import { hasMany } from 'ember-data/relationships';

const {
  computed,
  get,
  isPresent,
} = Ember;

const {
  attr,
  Model,
} = DS;

export default Model.extend({
  enabled: attr('boolean'),
  title: attr('string'),
  date: attr('date'),
  publishDate: attr('date'),
  image: attr('string'),
  strength: attr('string'),
  conditioning: attr('string'),
  description: attr('string'),
  videoId: attr('string'),
  tags: hasMany('tag', { async: true }),

  prettyDate: computed('date', function() {
    return window.moment(this.get('date')).utc().format('ddd MM.DD.YYYY').toUpperCase();
  }),
  prettyPublishDate: computed('date', function() {
    return window.moment(this.get('publishDate')).tz('America/Los_Angeles').format('ddd MM.DD.YYYY h:mm a').toUpperCase();
  }),
  datePickerDate: computed('date', function() {
    return window.moment(this.get('date')).utc().format('YYYY-MM-DD');
  }),
  publishDay: computed('publishDate', function() {
    return window.moment(this.get('publishDate')).startOf('day').format('YYYY-MM-DD');
  }),
  publishTime: computed('publishDate', function() {
    return window.moment(this.get('publishDate')).format('HH:mm');
  }),
  active: computed('publishDate', 'enabled', function() {
    return (window.moment(this.get('publishDate')) < window.moment()) && this.get('enabled');
  }),
  shortDescription: computed('strength', 'conditioning', function() {
    const strength = get(this, 'strength');
    const conditioning = get(this, 'conditioning');
    if (isPresent(conditioning)) {
      return `Workout: ${conditioning.substring(0, 140)}...`;
    } else if (isPresent(strength)) {
      return `Workout: ${strength.substring(0, 140)}...`;
    }

    return '';
  }),
});
