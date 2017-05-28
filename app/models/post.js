import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

const {
  attr,
  Model,
} = DS;

export default Model.extend({
  enabled: attr('boolean'),
  title: attr('string'),
  date: attr('date'),
  publishDate: attr('date'),
  contentImage: attr('string'),
  bannerImage: attr('string'),
  content: attr('string'),
  prettyDate: computed('date', function() {
    return window.moment(this.get('date')).utc().format('ddd MM.DD.YYYY').toUpperCase();
  }),
  datePickerDate: computed('date', function() {
    return window.moment(this.get('date')).utc().format('YYYY-MM-DD');
  }),
  publishDay: computed('publishDate', function() {
    return window.moment(this.get('publishDate')).startOf('day').format('YYYY-MM-DD');
  }),
  prettyPublishDate: computed('date', function() {
    return window.moment(this.get('publishDate')).tz('America/Los_Angeles').format('ddd MM.DD.YYYY h:mm a').toUpperCase();
  }),
  publishTime: computed('publishDate', function() {
    return window.moment(this.get('publishDate')).format('HH:mm');
  }),
  active: computed('publishDate', 'enabled', function() {
    return (window.moment(this.get('publishDate')) < window.moment()) && this.get('enabled');
  }),
  trunckatedContent: computed('content',  function() {
    return `${this.get('content').substring(0, 800)}...`;
  }),
});
