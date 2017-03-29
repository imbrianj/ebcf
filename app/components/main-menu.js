import Ember from 'ember';

const {
  on,
  $,
  Component,
} = Ember;

export default Component.extend({
  initializeComponent: on('didInsertElement', function() {
    let lastScrollTop = $(window).scrollTop();

    $(window).scroll(function() {
      let scrollTop = $(this).scrollTop();

      if (scrollTop > lastScrollTop) { // down
        $('.main-menu').finish().fadeOut('slow');
      } else { // up
        $('.main-menu').finish().fadeIn('slow');
      }

      lastScrollTop = scrollTop;
    });
  }),
});
