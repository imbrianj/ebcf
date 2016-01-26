import Ember from 'ember';

export default Ember.Controller.extend({
  didChange: Ember.observer('searchedTags', function(){
    this.send('searchInputChanged');
  }),
  dateChanged: Ember.observer('wodDate', function(){
    this.send('dateInputChanged', this.get('wodDate'));
  }),
  actions: {
    searchInputChanged() {
      var tags = this.get('searchedTags');
      if (tags.length > 0) {
        var wods = [];
        tags.forEach(function(tag){
          tag.get('wods').forEach(function(wod){
            wods.pushObject(wod);
          });
        });
        this.set('wods', wods);
      } else {
        this.set('wods', this.store.findAll('wod'));
      }
    },
    dateInputChanged(date) {
      if (date) {
        var filtered_wods = this.get('wods').filter(function (wod) {
          // return date.valueOf() == wod.get('date').valueOf();
          return wod.get("date").toDateString() == date.toDateString();
        });
        this.set('wods', filtered_wods);
      } else {
        this.set('wods', this.store.findAll('wod'));
      }
    },
    bulkUpdateTags(){
      var wods = this.get('wods');
      var tags = this.get('tags');
      wods.forEach( function(wod) {
        var strength = wod.get('strength').toLowerCase();
        var conditioning = wod.get('conditioning').toLowerCase();
        tags.forEach(function(tag) {
          if (strength.search(tag.get('value')) > 0) {
            wod.get("tags").pushObject(tag);
            tag.get("wods").pushObject(wod);
            tag.save();
            wod.save();
          } else if (conditioning.search(tag.get('value')) > 0) {
            wod.get("tags").pushObject(tag);
            tag.get("wods").pushObject(wod);
            tag.save();
            wod.save();
          }
        });
      });
    }
  }
});
