import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['date:desc'],
  sortedWods: Ember.computed.sort('wods', 'sortProps'),
  dateDepth: 1,
  _getWodsOlderThan(weeksAgo) {
    return this.store.query('wod', {
      filter: {
        simple: {
          publishDate: {
            $gt: weeksAgo,
            $lt: window.moment().toDate()
          },
          enabled: true
        }
      }
    });
  },
  actions: {
    getOlder() {
      var _this = this;
      var dateDepth = this.get('dateDepth') + 1;
      var weeksAgo = window.moment().day(-7 * dateDepth).toDate();

      Ember.$('.older').addClass('loading');

      this._getWodsOlderThan(weeksAgo).then(function(wods){
        Ember.$('.older').removeClass('loading');

        _this.set('wods', wods);
        _this.set('dateDepth', dateDepth);
      });
    }
  }
});
