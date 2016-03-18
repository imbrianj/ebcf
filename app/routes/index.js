import Ember from 'ember';

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
    var today = moment().utc().startOf("day").toDate();
    // var today = moment("2016-03-13").utc().startOf("day").toDate();

    return this.store.queryRecord('wod', {
      filter: {
        simple: {
          // date: "2014-06-19T00:00:00.000Z"
          date: today
        }
      }
    });
  }
});
