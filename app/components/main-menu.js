import Ember from 'ember';

export default Ember.Component.extend({
  initializeComponent: Ember.on('didInsertElement', function() {

    var lastScrollTop = $(window).scrollTop();

    Ember.$(window).scroll( function(event) {

       var st = Ember.$(this).scrollTop();

       if (st > lastScrollTop) { //down
         if (Ember.$('.main-menu').transition('is visible')) {
           Ember.$('.main-menu').transition('hide');
         }
       } else { // up
         if (!Ember.$('.main-menu').transition('is visible')){
           Ember.$('.main-menu').transition('fade down');
         }
       }
       lastScrollTop = st;

    });
  })
});
