import Ember from 'ember';

export default Ember.Controller.extend({
  didChange: Ember.observer('searchedTags', function(){
    this.send('searchInputChanged');
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
    }
  }
});
