import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    bulkUpdateTags(){
      var wods = this.get('wods');
      var tags = this.get('tags');
      debugger;
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
