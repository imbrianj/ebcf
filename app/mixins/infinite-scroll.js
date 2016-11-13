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

  bindScrollHandler() {
    $(window).on('touchmove scroll', this._handleScroll.bind(this));
  },

  _handleScroll() {
    if ( $(window).scrollTop() > ($(document).height() - $(window).height() - 800) ) {
     this._getOlder();
    }

    if( $(window).scrollTop() > 100) {
     $('#back-to-top').finish().fadeIn('slow');
    } else {
     $('#back-to-top').finish().fadeOut('slow');
    }

    if( $(window).scrollTop() > 445) {
      $('.search').addClass('sticky');
    } else {
      $('.search').removeClass('sticky');
    }
  },

  actions: {
    backToTop() {
      $('body,html').animate({
        scrollTop : 0
      }, 500);
    }
  }
});
