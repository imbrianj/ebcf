import Ember from 'ember';

export default Ember.Component.extend({
  customOptions: {scrollwheel: false,
                  disableDefaultUI: true}
 //  insertMap: function() {
 //    var mapDiv = document.getElementById('map');
 //
 //
 //    var myLatLng = {lat: 47.614265, lng: -122.345141};
 //    var map = new google.maps.Map(mapDiv, {
 //      center: myLatLng,
 //      zoom: 15,
 //      scrollwheel: false,
 //      disableDefaultUI: true
 //    });
 //
 //    var marker = new google.maps.Marker({
 //     position: myLatLng,
 //     map: map,
 //     title: 'Elliott Bay Crossfit'
 //   });
 // }.on('didInsertElement')

});
