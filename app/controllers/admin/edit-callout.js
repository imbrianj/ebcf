import Ember from 'ember';

const {
  get,
  set,
  Controller,
} = Ember;

export default Controller.extend({
  actions: {
    updateCallout(){
      var _this = this;
      var callout = get(this, 'callout');

      var startDay = get(callout, 'startDay');
      var startTime = get(callout, 'startTime');
      var startDate = window.moment(startDay + " " + startTime).toDate();

      var endDay = get(callout, 'endDay');
      var endTime = get(callout, 'endTime');
      var endDate = window.moment(endDay + " " + endTime).toDate();

      set(callout, 'startDate', startDate);
      set(callout, 'endDate', endDate);

      callout.save().then(function() {
        _this.transitionToRoute('admin.callouts');
      });
    }
  }
});
