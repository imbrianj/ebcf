import DS from 'ember-data';

export default DS.Model.extend({
  enabled: DS.attr('boolean'),
  title: DS.attr('string'),
  date: DS.attr('date'),
  publishDate: DS.attr('date'),
  image: DS.attr('string'),
  strength: DS.attr('string'),
  conditioning: DS.attr('string'),
  description: DS.attr('string'),
  video_id: DS.attr('string'),
  tags: DS.hasMany('tag', {async: true}),
  prettyDate: Ember.computed('date', function() {
    return window.moment(this.get('date')).utc().format('ddd MM.DD.YYYY').toUpperCase();
  }),
  prettyPublishDate: Ember.computed('date', function() {
    return window.moment(this.get('publishDate')).tz("America/Los_Angeles").format('ddd MM.DD.YYYY h:mm a').toUpperCase();
  }),
  datePickerDate: Ember.computed('date', function() {
    return window.moment(this.get('date')).utc().format('YYYY-MM-DD');
  }),
  publishDay: Ember.computed('publishDate', function() {
    return window.moment(this.get('publishDate')).startOf('day').format('YYYY-MM-DD');
  }),
  publishTime: Ember.computed('publishDate', function() {
    return window.moment(this.get('publishDate')).format('HH:mm');
  }),
  active: Ember.computed('publishDate', 'enabled', function() {
    return (window.moment(this.get('publishDate')) < window.moment()) && this.get('enabled');
  })
});
