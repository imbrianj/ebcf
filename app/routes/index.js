import Ember from 'ember';

// var rentals = [{
//   id: 1,
//   title: 'Grand Old Mansion',
//   owner: 'Veruca Salt',
//   city: 'San Francisco',
//   type: 'Estate',
//   bedrooms: 15,
//   image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
// }, {
//   id: 2,
//   title: 'Urban Living',
//   owner: 'Mike TV',
//   city: 'Seattle',
//   type: 'Condo',
//   bedrooms: 1,
//   image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg'
// }, {
//   id: 3,
//   title: 'Downtown Charm',
//   owner: 'Violet Beauregarde',
//   city: 'Portland',
//   type: 'Apartment',
//   bedrooms: 3,
//   image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg'
// }];

export default Ember.Route.extend({
  model() {
    // return this.store.findAll('tag');
    // return this.store.query('wod', { title: "WOD 1" } );
    // var ajaxOptions = {
    //   url: '/api/v1/wods?filter[simple][title]=WOD+1',
    //   data: {},
    //   type: 'GET',
    //   dataType: 'json'
    // };
    // return Ember.$.ajax(ajaxOptions);
    // return Ember.$.getJSON('/api/v1/wods?filter[simple][title]=WOD+1');
    // var today = moment().startOf("day").toDate()
    var date = moment().startOf("day").toDate();

    return this.store.queryRecord('wod', {
      filter: {
        simple: {
          date: date
        }
      }
    });
  }
});
