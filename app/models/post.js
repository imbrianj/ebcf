import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({
  enabled: DS.attr('boolean'),
  title: DS.attr('string'),
  date: DS.attr('date'),
  publishDate: DS.attr('date'),
  image: DS.attr('string'),
  content: DS.attr('string'),
  prettyDate: computed('date', function() {
    return window.moment(this.get('date')).utc().format('ddd MM.DD.YYYY').toUpperCase();
  }),
});
