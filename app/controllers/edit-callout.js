import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateCallout(){
      var _this = this;
      var callout = this.get('callout');

      var startDay = callout.get('startDay');
      var startTime = callout.get('startTime');
      var startDate = window.moment(startDay + " " + startTime).toDate();

      var endDay = callout.get('endDay');
      var endTime = callout.get('endTime');
      var endDate = window.moment(endDay + " " + endTime).toDate();

      callout.set('startDate', startDate);
      callout.set('endDate', endDate);

      callout.save().then(function() {
        _this.transitionToRoute('callouts');
      });
    }
  }
});
