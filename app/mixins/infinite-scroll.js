import Ember from 'ember';

const {
  $,
  Mixin
} = Ember;

export default Mixin.create({
  init() {
    this._super(...arguments);
    this.bindScrollHandler();
  },

  dateDepth: 1,

  bindScrollHandler() {
    $(window).on('touchmove scroll', this._handleScroll.bind(this));
  },

  _handleScroll() {
   if ( $(window).scrollTop() > ($(document).height() - $(window).height() - 600) ) {
     this._getOlder();
   }
  },
});
