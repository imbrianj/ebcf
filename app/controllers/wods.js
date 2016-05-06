import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tag', 'date'],
  tag: null,
  date: null,
  sortProps: ['date:desc'],
  sortedWods: Ember.computed.sort('wods', 'sortProps'),
  dateDepth: 1,
  searching: false,
  loading: false,
  filterByTag: Ember.observer('tag', function() {
    this.set('loading', true);
    var tagValue = this.get('tag');
    if (tagValue){
      tagValue = tagValue.replace("&amp;", "&");
    }
    this.send('tagParamChanged', tagValue);
  }),
  filterByDate: Ember.observer('date', function() {
    this.set('loading', true);
    var date = this.get('date');
    this.send('dateParamChanged', date);
  }),
  wodsFound: Ember.computed('wods.length', function() {
    var numberOfWods = this.get('wods').get('length');
    var res = "";
    if (numberOfWods === 1) {
      res =  numberOfWods + " Wod Found for ";
    } else {
      res = numberOfWods + " Wods Found for ";
    }

    var tag = this.get('tag');
    var date = this.get('date');

    if (date) {
      res = res + window.moment(date).format('ddd MM.DD.YYYY').toUpperCase();
    } else {
      res = res + tag.replace("&amp;", "&").toUpperCase();
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
          publishDate: {
            $gt: weeksAgo,
            $lt: window.moment().toDate()
          },
          enabled: true
        }
      }
    });
  },
  actions: {
    tagParamChanged(tagValue) {
      var _this = this;

      if (tagValue) {
        this._getTag(tagValue).then(function(tags){
          var tag = tags.get('firstObject');
          tag.get('wods').then(function(wods){
            var enabledWods = wods.filterBy('enabled', true);
            _this.set('wods', enabledWods);
            _this.set('searching', tagValue);
            _this.set('loading', false);
          });
        });
      } else {
        var dateDepth = this.get('dateDepth');
        var weeksAgo = window.moment().day(-7 * dateDepth).toDate();
        this._getWodsOlderThan(weeksAgo).then(function(wods){
          _this.set('wods', wods);
          _this.set('searching', tagValue);
          _this.set('loading', false);
        });
      }
    },
    dateParamChanged(date) {
      var _this = this;
      if (date) {
        var day = window.moment(date).utc().startOf('day').toISOString();
        this.store.query('wod', {
          filter: {
            simple: {
              date: day,
              enabled: true
            }
          }
        }).then(function(wods){
          _this.set('wods', wods);
          _this.set('searching', date);
          _this.set('loading', false);
        });

      } else {
        var dateDepth = this.get('dateDepth');
        var weeksAgo = window.moment().day(-7 * dateDepth).toDate();
        this._getWodsOlderThan(weeksAgo).then(function(wods){
          _this.set('wods', wods);
          _this.set('searching', date);
          _this.set('loading', false);
        });

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
