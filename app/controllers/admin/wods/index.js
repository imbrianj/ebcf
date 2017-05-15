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
  sortedWods: computed.sort('wods', 'sortProps'),
  actions: {
    filterDate() {
      let fromDate = get(this, 'fromDate');
      let toDate = get(this, 'toDate');
      let _this = this;

      $('.filter').addClass('loading');

      this.store.query('wod', {
        filter: {
          simple: {
            publishDate: {
              $gt: fromDate,
              $lt: toDate,
            },
          },
        },
      }).then(function(wods) {
        set(_this, 'wods', wods);
        $('.filter').removeClass('loading');
      });
    },
  },
});
