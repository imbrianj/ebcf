import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['date:desc'],
  wods2: Ember.computed.sort('wods', 'sortProps'),
  dateDepth: 1,
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
        var day = moment(date).utc().startOf('day').toISOString()
        var filteredWods = this.store.query('wod', {
          filter: {
            simple: {
              date: day
            }
          }
        });

        this.set('wods', filteredWods);
      } else {
        var dateDepth = this.get('dateDepth') + 1;
        var weeksAgo = moment().day(-7 * dateDepth).toDate();
        var wods = this.store.query('wod', {
          filter: {
            simple: {
              date: {
                $gt: weeksAgo
              }
            }
          }
        });
        this.set('wods', wods);
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
    },
    getOlder() {
      var dateDepth = this.get('dateDepth') + 1;
      var weeksAgo = moment().day(-7 * dateDepth).toDate();
      var wods = this.store.query('wod', {
        filter: {
          simple: {
            date: {
              $gt: weeksAgo
            }
          }
        }
      });

      this.set('wods', wods);
      this.set('dateDepth', dateDepth);
    }
  }
});
