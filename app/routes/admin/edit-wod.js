import Ember from 'ember';

const {
  get,
  set,
  Route,
  RSVP,
} = Ember;

export default Route.extend({
  model(params) {
    return RSVP.hash({
      wod: this.store.find('wod', params.wod_id),
      allTags: this.store.findAll('tag'),
    });

  },

  setupController(controller, model) {
    controller.set('allTags', model.allTags);
    controller.set('wod', model.wod);
  },

  actions: {
    updateWod() {
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
