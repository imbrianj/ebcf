import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    bulkUpdateTags(){
      var startDate = moment(this.get('startDate')).utc().startOf('day');
      var endDate = moment(this.get('endDate')).utc().startOf("day");

      var days = (endDate.toDate() - startDate.toDate())/1000/60/60/24;
      var tags = this.get('tags');

      for(var i = 0; i < days; i++) {
        var date = startDate.toDate();
        this.store.queryRecord('wod', {
          filter: {
            simple: {
              date: date
            }
          }
        }).then(function(wods){
          if(wods.length > 0) {
          var wod = wods[0];
          var strength = wod.get('strength').toLowerCase();
          var conditioning = wod.get('conditioning').toLowerCase();

          tags.forEach(function(tag) {

              var tag_value = tag.get('value').toLowerCase();

              if (tag_value === "pull-up") {
                if(strength.search("pull up") >= 0 || conditioning.search("pull up") >= 0 || strength.search("pull-up") >= 0 || conditioning.search("pull-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "hspu") {
                if(strength.search("handstand push up") >= 0 || conditioning.search("handstand push up") >= 0 || strength.search("handstand push-up") >= 0 || conditioning.search("handstand push-up") >= 0 ){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "hand release push-up") {
                if(strength.search("hand release push up") >= 0 || conditioning.search("hand release push up") >= 0 || strength.search("hand release push-up") >= 0 || conditioning.search("hand release push-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "ground to OH") {
                if(strength.search("ground to overhead") >= 0 || conditioning.search("ground to overhead") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "toes to bar") {
                if(strength.search("toes to bar") >= 0 || conditioning.search("toes to bar") >= 0 || strength.search("toe to bar") >= 0 || conditioning.search("toe to bar") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "weighted pull-up") {
                if(strength.search("weighted pull up") >= 0 || conditioning.search("weighted pull up") >= 0 || strength.search("weighted pull-up") >= 0 || conditioning.search("weighted pull-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "SDLHP") {
                if(strength.search("sumo deadlift high-pull") >= 0 || conditioning.search("sumo deadlift high-pull") >= 0 || strength.search("sumo deadlift high pull") >= 0 || conditioning.search("sumo deadlift high pull") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "C2B pull-up") {
                if(strength.search("chest to bar pull-up") >= 0 || conditioning.search("chest to bar pull-up") >= 0 || strength.search("chest to bar pull up") >= 0 || conditioning.search("chest to bar pull up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "burpee pull-up") {
                if(strength.search("burpee pull up") >= 0 || conditioning.search("burpee pull up") >= 0 || strength.search("burpee pull-up") >= 0 || conditioning.search("burpee pull-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "muscle-up") {
                if(strength.search("muscle up") >= 0 || conditioning.search("muscle up") >= 0 || strength.search("muscle-up") >= 0 || conditioning.search("muscle-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "bar muscle-up") {
                if(strength.search("bar muscle up") >= 0 || conditioning.search("bar muscle up") >= 0 || strength.search("bar muscle-up") >= 0 || conditioning.search("bar muscle-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "1000m row") {
                if(strength.search("1000 m row") >= 0 || conditioning.search("1000 m row") >= 0 || strength.search("1000m row") >= 0 || conditioning.search("1000m row") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "2000m row") {
                if(strength.search("2000 m row") >= 0 || conditioning.search("2000 m row") >= 0 || strength.search("2000m row") >= 0 || conditioning.search("2000m row") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "500m row") {
                if(strength.search("500 m row") >= 0 || conditioning.search("500 m row") >= 0 || strength.search("500m row") >= 0 || conditioning.search("500m row") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "1500m row") {
                if(strength.search("1500 m row") >= 0 || conditioning.search("1500 m row") >= 0 || strength.search("1500m row") >= 0 || conditioning.search("1500m row") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "max effort 500m row") {
                if(strength.search("max effort 500 m row") >= 0 || conditioning.search("max effort 500 m row") >= 0 || strength.search("max effort 500m row") >= 0 || conditioning.search("max effort 500m row") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "400m run") {
                if(strength.search("400 m run") >= 0 || conditioning.search("400 m run") >= 0 || strength.search("400m run") >= 0 || conditioning.search("400m run") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "800m run") {
                if(strength.search("800 m run") >= 0 || conditioning.search("800 m run") >= 0 || strength.search("800m run") >= 0 || conditioning.search("800m run") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }

              else if (tag_value === "1200m run") {
                if(strength.search("1200 m run") >= 0 || conditioning.search("1200 m run") >= 0 || strength.search("1200m run") >= 0 || conditioning.search("1200m run") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }
              else if (tag_value === "push-up") {
                if(strength.search("push up") >= 0 || conditioning.search("push up") >= 0 || strength.search("push-up") >= 0 || conditioning.search("push-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }
              else if (tag_value === "sit-up") {
                if(strength.search("sit up") >= 0 || conditioning.search("sit up") >= 0 || strength.search("sit-up") >= 0 || conditioning.search("sit-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }
              else if (tag_value === "bar muslce-up") {
                if(strength.search("bar muslce up") >= 0 || conditioning.search("bar muslce up") >= 0 || strength.search("bar muslce-up") >= 0 || conditioning.search("bar muslce-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }
              else if (tag_value === "burpee muscle-up") {
                if(strength.search("bar muslce up") >= 0 || conditioning.search("bar muslce up") >= 0 || strength.search("bar muslce-up") >= 0 || conditioning.search("bar muslce-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }
              else if (tag_value === "burpee pull-up") {
                if(strength.search("burpee pull up") >= 0 || conditioning.search("burpee pull up") >= 0 || strength.search("burpee pull-up") >= 0 || conditioning.search("burpee pull-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }
              else if (tag_value === "clapping push-up") {
                if(strength.search("clapping push up") >= 0 || conditioning.search("clapping push up") >= 0 || strength.search("clapping push-up") >= 0 || conditioning.search("clapping push-up") >= 0){
                  wod.get("tags").pushObject(tag);
                  // tag.get("wods").pushObject(wod);
                  tag.save();
                  wod.save();
                }
              }
              else if (strength.search(tag_value) >= 0 || conditioning.search(tag_value) >= 0) {
                wod.get("tags").pushObject(tag);
                // tag.get("wods").pushObject(wod);
                tag.save();
                wod.save();
              }
            }); //tags foreach
          } //if
        }); // then
        startDate.add(1, "day");
      } //for loop
    } // bulkUpdateTags
  } // actions
});
