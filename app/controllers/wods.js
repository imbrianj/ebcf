import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tag'],
  tag: null,
  date: null,
  sortProps: ['date:desc'],
  wods2: Ember.computed.sort('wods', 'sortProps'),
  dateDepth: 1,
  searching: false,
  filterByTag: Ember.observer('tag', function() {
    var tagValue = this.get('tag');
    var _this = this;
    this.store.query('tag', {
      filter: {
        simple: {
          value: tagValue
        }
      }
    }).then(function(tags){
      if(tags.get('length') > 0) {
        var tag = tags.get('firstObject');
        Ember.$('.dropdown').dropdown('set selected', tag.get('value'));
        _this.send('searchInputChanged', tag.get('id'), tag.get('value'));
      } else {
        _this.set('searching', false);
      }
    });

  }),
  wodsFound: Ember.computed('wods.length', function() {
    var numberOfWods = this.get('wods').get('length');
    var searching = this.get('searching');

    var res = "";
    if (numberOfWods === 1) {
      res =  numberOfWods + " Wod Found for ";
    } else {
      res = numberOfWods + " Wods Found for ";
    }

    if (window.moment(searching).isValid()) {
      res = res + window.moment(searching).format('ddd MM.DD.YYYY').toUpperCase();
    } else {
      res = res + searching.toUpperCase();
    }
    return res;
  }),
  noResultsFound: Ember.computed('wods.length', function() {
    return (this.get('wods').get('length') < 1);
  }),
  actions: {
    isSearching(tagId, value) {
      var _this = this;
      if (tagId) {
        this.store.findRecord('tag', tagId).then(function(tag) {
          tag.get('wods').then(function(wods){
            _this.set('wods', wods);
            _this.set('searching', value);
          });
        });
      } else {
        var dateDepth = this.get('dateDepth');
        var weeksAgo = window.moment().day(-7 * dateDepth).toDate();
        this.store.query('wod', {
          filter: {
            simple: {
              date: {
                $gt: weeksAgo
              }
            }
          }
        }).then(function(wods){
          _this.set('wods', wods);
          _this.set('searching', value);
        });
      }
    },
    dateInputChanged(date) {
      if (date) {
        this.set('searching', date);
        var day = window.moment(date).utc().startOf('day').toISOString();
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
        var weeksAgo = window.moment().day(-7 * dateDepth).toDate();
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
      var _this = this;
      var dateDepth = this.get('dateDepth') + 1;
      var weeksAgo = window.moment().day(-7 * dateDepth).toDate();

      Ember.$('.older').addClass('loading');

      _this.store.query('wod', {
        filter: {
          simple: {
            date: {
              $gt: weeksAgo
            }
          }
        }
      }).then(function(wods){
        Ember.$('.older').removeClass('loading');

        _this.set('wods', wods);
        _this.set('dateDepth', dateDepth);
      });
    },
  }
});
