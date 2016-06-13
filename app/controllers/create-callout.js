import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createCallout(){
      var _this = this;

      var startDay = this.get('newStartDay');
      var startTime = this.get('newStartTime');
      var startDate = window.moment(startDay + " " + startTime).toDate();

      var endDay = this.get('newEndDay');
      var endTime = this.get('newEndTime');
      var endDate = window.moment(endDay + " " + endTime).toDate();

      var value = this.get('newValue');

      this.set('startDate', startDate);
      this.set('endDate', endDate);


      var callout = this.store.createRecord('callout', {
         enabled: true,
         startDate: startDate,
         endDate: endDate,
         value: value,
       });

      callout.save().then(function() {
        _this.transitionToRoute('callouts');
      });
    }
  }
});
