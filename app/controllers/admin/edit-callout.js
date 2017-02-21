import Ember from 'ember';

const {
  get,
  set,
  Controller,
} = Ember;

export default Controller.extend({
  actions: {
    updateCallout() {
      let callout = get(this, 'callout');

      let startDay = get(callout, 'startDay');
      let startTime = get(callout, 'startTime');
      let startDate = window.moment(`${startDay} ${startTime}`).toDate();

      let endDay = get(callout, 'endDay');
      let endTime = get(callout, 'endTime');
      let endDate = window.moment(`${endDay} ${endTime}`).toDate();

      set(callout, 'startDate', startDate);
      set(callout, 'endDate', endDate);

      callout.save().then(() => {
        this.transitionToRoute('admin.callouts');
      });
    },
  },
});
