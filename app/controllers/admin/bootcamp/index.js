import Ember from 'ember';

const {
  computed,
  get,
  set,
  $,
  Controller,
} = Ember;

export default Controller.extend({
  sortProps: ['date:desc'],
  sortedBootcamps: computed.sort('bootcamps', 'sortProps'),
  actions: {
    filterDate() {
      let fromDate = get(this, 'fromDate');
      let toDate = get(this, 'toDate');
      let _this = this;

      $('.filter').addClass('loading');

      this.store.query('bootcamp', {
        filter: {
          simple: {
            publishDate: {
              $gt: fromDate,
              $lt: toDate,
            },
          },
        },
      }).then(function(bootcamps) {
        set(_this, 'bootcamps', bootcamps);
        $('.filter').removeClass('loading');
      });
    },
  },
});
