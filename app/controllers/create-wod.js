import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createWod() {
     var title = this.get('newTitle');
     var date = this.get('newDate');
     var strength = this.get('newStrength');
     var conditioning = this.get('newConditioning');
     var imageSource = document.getElementById('img').src;

     var wod = this.store.createRecord('wod', {
        title: title,
        date: date,
        strength: strength,
        conditioning: conditioning,
        image: imageSource,
      });
      debugger;
      // var tags = this.store.findAll('tag');

      // var tag = this.store.createRecord('tag', {
      //     value: "push ups"
      // });
      // tag.save();

      // wod.save();
    }
  }
});
