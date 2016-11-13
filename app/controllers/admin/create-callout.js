import Ember from 'ember';

const {
  get,
  set,
  Controller,
} = Ember;

export default Controller.extend({
  actions: {
    createCallout(){
      var _this = this;

      var startDay = get(this, 'newStartDay');
      var startTime = get(this, 'newStartTime');
      var startDate = window.moment(startDay + " " + startTime).toDate();

      var endDay = get(this, 'newEndDay');
      var endTime = get(this, 'newEndTime');
      var endDate = window.moment(endDay + " " + endTime).toDate();

      var value = get(this, 'newValue');

      set(this, 'startDate', startDate);
      set(this, 'endDate', endDate);


      var callout = this.store.createRecord('callout', {
         enabled: true,
         startDate: startDate,
         endDate: endDate,
         value: value,
       });

      callout.save().then(function() {
        _this.transitionToRoute('admin.callouts');
      });
    }
  }
});
