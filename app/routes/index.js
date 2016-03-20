import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var time = moment().subtract(3, 'days').startOf('day').toDate();

    // var today = moment("2016-03-13").utc().startOf("day").toDate();
    return this.store.query('wod', {
      filter: {
        simple: {
          date: {
            $gt: time
          }
        }
      }
    }).then(function(results) {
      return results.get('lastObject');
    });
  }
});
