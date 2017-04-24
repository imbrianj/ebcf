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
      bootcamp: this.store.find('bootcamp', params.bootcamp_id),
      allTags: this.store.findAll('tag'),
    });
  },

  setupController(controller, model) {
    controller.set('allTags', model.allTags);
    controller.set('bootcamp', model.bootcamp);
  },

  actions: {
    updateBootcamp() {
      let bootcamp = get(this, 'controller.bootcamp');

      let date = window.moment(get(bootcamp, 'datePickerDate')).utc().startOf('day').toDate();
      set(bootcamp, 'date', date);

      let publishDay = get(bootcamp, 'publishDay');
      let publishTime = get(bootcamp, 'publishTime');
      let publishDate = window.moment(`${publishDay} ${publishTime}`).toDate();
      set(bootcamp, 'publishDate', publishDate);

      bootcamp.save().then((bootcamp) => {
        // let tags = get(bootcamp, 'tags');
        // tags.forEach((tag) => {
        //   tag.save();
        // });
        this.transitionTo('admin.bootcamp');
      });
    },
  },
});
