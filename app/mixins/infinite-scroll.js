import Ember from 'ember';

const {
  $,
  Mixin,
  K,
} = Ember;

export default Mixin.create({
  getOlder: K,

  init() {
    this._super(...arguments);
    this.bindScrollHandler();
  },

  bindScrollHandler() {
    $(window).on('touchmove scroll', this._handleScroll.bind(this));
  },

  _handleScroll() {
    let scrollTop = $(window).scrollTop();
    if (scrollTop > ($(document).height() - $(window).height() - 800)) {
      this.send('getOlder');
    }

    if (scrollTop > 100) {
      $('#back-to-top').finish().fadeIn('slow');
    } else {
      $('#back-to-top').finish().fadeOut('slow');
    }

    if (scrollTop > 445) {
      $('#search').addClass('sticky');
    } else {
      $('#search').removeClass('sticky');
    }
  },

  actions: {
    backToTop() {
      $('body,html').animate({
        scrollTop: 0,
      }, 500);
    },
  },
});
