import Ember from 'ember';

const {
  computed,
  get,
  Component,
 } = Ember;

export default Component.extend({
  classNames: ['wod-item'],
  placeHolderImage: '/assets/place-holder-image.png',
  alt: computed('prettyDate', function() {
    let wod = get(this, 'wod');
    return `Workout of the Day for ${get(wod, 'prettyDate')}`;
  }),
});
