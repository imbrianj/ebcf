import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['date:desc'],
  wods2: Ember.computed.sort('wods', 'sortProps'),
  dateDepth: 1,
  noResultsFound: Ember.computed('wods.length', function() {
    return (this.get('wods').get('length') < 1);
  }),
  didChange: Ember.observer('searchedTags', function(){
    this.send('searchInputChanged');
  }),
  dateChanged: Ember.observer('wodDate', function(){
    this.send('dateInputChanged', this.get('wodDate'));
  }),
  actions: {
    searchInputChanged(tagId) {
      // var tags = this.get('searchedTags');
      var _this = this;
      if (tagId) {
        this.store.findRecord('tag', tagId).then(function(tag){
          var wods = tag.get('wods');
          _this.set('wods', wods);
        });


        // var wods = tag.get('wods');
        // this.set('wods', wods);
      // if (tags.length > 0) {
      //   var wods = [];
      //   tags.forEach(function(tag){
      //     tag.get('wods').forEach(function(wod){
      //       wods.pushObject(wod);
      //     });
      //   });
      //   this.set('wods', wods);
      } else {
        var dateDepth = this.get('dateDepth');
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
        var dateDepth = this.get('dateDepth');
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
    },
    tagsEntered: function(component, id, value) {
      this.send('searchInputChanged', id);
    }
  }
});
