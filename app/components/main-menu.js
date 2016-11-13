import Ember from 'ember';

export default Ember.Component.extend({
  initializeComponent: Ember.on('didInsertElement', function() {

    var lastScrollTop = $(window).scrollTop();

    Ember.$(window).scroll( function(event) {

       var st = Ember.$(this).scrollTop();

       if (st > lastScrollTop) { //down
         $('.main-menu').finish().fadeOut('slow');
       } else { // up
         $('.main-menu').finish().fadeIn('slow');
       }
       lastScrollTop = st;

    });
  })
});
