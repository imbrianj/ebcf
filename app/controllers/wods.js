import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tag', 'date'],
  tag: null,
  date: null,
  sortProps: ['date:desc'],
  wods2: Ember.computed.sort('wods', 'sortProps'),
  dateDepth: 1,
  searching: false,
  filterByTag: Ember.observer('tag', function() {
    var tagValue = this.get('tag');
    this.set('searching', tagValue);
    this.send('tagParamChanged', tagValue);
    Ember.$('.dropdown').dropdown('set selected', tagValue);
  }),
  filterByDate: Ember.observer('date', function(){
    var date = this.get('date');
    this.set('searching', date);
    this.send('dateParamChanged', date)
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
  _getTag(tagValue) {
    return this.store.query('tag', {
      filter: {
        simple: {
          value: tagValue
        }
      }
    });
  },
  _getWodsOlderThan(weeksAgo) {
    return this.store.query('wod', {
      filter: {
        simple: {
          date: {
            $gt: weeksAgo
          }
        }
      }
    });
  },
  actions: {
    searchInputChanged(value) {
      if (value) {
        this.set('tag', value);
      } else {
        this.set('tag', null);
      }
    },
    tagParamChanged(tagValue) {
      var _this = this;

      if (tagValue){
        this._getTag(tagValue).then(function(tags){
          var tag = tags.get('firstObject');
          var value = tag.get('value');
          tag.get('wods').then(function(wods){
            _this.set('wods', wods);
            // Ember.$('.dropdown').dropdown('set selected', value);
          });
        });
      } else {
        var dateDepth = this.get('dateDepth');
        var weeksAgo = window.moment().day(-7 * dateDepth).toDate();
        var wods = this._getWodsOlderThan(weeksAgo);
        this.set('wods', wods);
      }
    },
    dateInputChanged(date) {
      if (date) {
        this.set('date', date);
      } else {
        this.set('date', null);
      }
    },
    dateParamChanged(date) {
      if (date) {
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
        var wods = this._getWodsOlderThan(weeksAgo);
        this.set('wods', wods);
      }
    },
    getOlder() {
      var _this = this;
      var dateDepth = this.get('dateDepth') + 1;
      var weeksAgo = window.moment().day(-7 * dateDepth).toDate();

      Ember.$('.older').addClass('loading');

      this._getWodsOlderThan(weeksAgo).then(function(wods){
        Ember.$('.older').removeClass('loading');

        _this.set('wods', wods);
        _this.set('dateDepth', dateDepth);
      });
    }
  }
});
