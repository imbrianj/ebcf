import Ember from 'ember';

const {
  get,
  set,
  Controller,
} = Ember;

export default Controller.extend({
  actions: {
    createCallout() {
      let _this = this;

      let startDay = get(this, 'newStartDay');
      let startTime = get(this, 'newStartTime');
      let startDate = window.moment(`${startDay} ${startTime}`).toDate();

      let endDay = get(this, 'newEndDay');
      let endTime = get(this, 'newEndTime');
      let endDate = window.moment(`${endDay} ${endTime}`).toDate();

      let value = get(this, 'newValue');

      set(this, 'startDate', startDate);
      set(this, 'endDate', endDate);

      let callout = this.store.createRecord('callout', {
        enabled: true,
        startDate,
        endDate,
        value,
      });

      callout.save().then(function() {
        _this.transitionToRoute('admin.callouts');
      });
    },
  },
});
