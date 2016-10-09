import Ember from 'ember';

export default Ember.Controller.extend({
  // sortProps: ['date:desc'],
  // sortedWods: Ember.computed.sort('wods', 'sortProps'),
  // actions: {
  //   filterDate() {
  //     var fromDate = this.get('fromDate');
  //     var toDate = this.get('toDate');
  //     var _this = this;
  //
  //     Ember.$('.filter').addClass('loading');
  //
  //     this.store.query('wod', {
  //       filter: {
  //         simple: {
  //           publishDate: {
  //             $gt: fromDate,
  //             $lt: toDate
  //           }
  //         }
  //       }
  //     }).then(function(wods){
  //       _this.set('wods', wods);
  //       Ember.$('.filter').removeClass('loading');
  //     });
  //   }
  // }
});
