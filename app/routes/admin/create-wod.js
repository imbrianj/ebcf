import Ember from 'ember';

const {
  get,
  set,
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  model() {
    let wod = this.store.createRecord('wod', { enabled: true });

    return RSVP.hash({
      wod,
      allTags: this.store.findAll('tag'),
    });
  },

  setupController(controller, model) {
    controller.set('allTags', model.allTags);
    controller.set('wod', model.wod);
  },

  actions: {
    createWod() {
      let wod = get(this, 'controller.wod');

      let date = window.moment(get(wod, 'datePickerDate')).utc().startOf('day').toDate();
      set(wod, 'date', date);

      let publishDay = get(wod, 'publishDay');
      let publishTime = get(wod, 'publishTime');
      let publishDate = window.moment(`${publishDay} ${publishTime}`).toDate();
      set(wod, 'publishDate', publishDate);

      wod.save().then((wod) => {
        let tags = get(wod, 'tags');
        tags.forEach((tag) => {
          tag.save();
        });
        this.transitionTo('admin.all-wods');
      });
    },
  },
});
