import Ember from 'ember';
import InfiniteScrollMixin from 'ebcf/mixins/infinite-scroll';

const {
  computed,
  get,
  observer,
  set,
  Controller,
} = Ember;

export default Controller.extend(InfiniteScrollMixin, {
  queryParams: ['tag', 'date'],
  tag: null,
  date: null,
  sortProps: ['date:desc'],
  sortedWods: computed.sort('wods', 'sortProps'),
  dateDepth: 2,
  searching: false,
  loading: false,
  loadingMore: false,

  filterByTag: Ember.observer('tag', function() {
    set(this, 'loading', true);
    var tagValue = get(this, 'tag');
    if (tagValue){
      tagValue = tagValue.replace("&amp;", "&");
    }
    this.send('tagParamChanged', tagValue);
  }),

  filterByDate: observer('date', function() {
    set(this, 'loading', true);
    var date = get(this, 'date');
    this.send('dateParamChanged', date);
  }),

  wodsFound: computed('wods.length', function() {
    var numberOfWods = get(this, 'wods.length');
    var res = "";

    if (numberOfWods === 1) {
      res =  numberOfWods + " Wod Found for ";
    } else {
      res = numberOfWods + " Wods Found for ";
    }

    var tag = get(this, 'tag');
    var date = get(this, 'date');

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

  _getOlder() {
    if (get(this, 'searching')) {
      return;
    }

    set(this, 'loadingMore', true);

    var _this = this;
    var dateDepth = get(this, 'dateDepth') + 2;
    var weeksAgo = window.moment().day(-7 * dateDepth).toDate();

    this._getWodsOlderThan(weeksAgo).then(function(wods) {
      set(_this, 'wods', wods);
      set(_this, 'dateDepth', dateDepth);
      set(_this, 'loadingMore', false);
    });
  },

  actions: {
    tagParamChanged(tagValue) {
      var _this = this;

      if (tagValue) {
        this._getTag(tagValue).then(function(tags){
          var tag = get(tags, 'firstObject');
          get(tag, 'wods').then(function(wods){
            var enabledWods = wods.filterBy('enabled', true);
            set(_this, 'wods', enabledWods);
            set(_this, 'searching', tagValue);
            set(_this, 'loading', false);
          });
        });
      } else {
        var dateDepth = get(this, 'dateDepth');
        var weeksAgo = window.moment().day(-7 * dateDepth).toDate();
        this._getWodsOlderThan(weeksAgo).then(function(wods){
          set(_this, 'wods', wods);
          set(_this, 'searching', tagValue);
          set(_this, 'loading', false);
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
          set(_this, 'wods', wods);
          set(_this, 'searching', date);
          set(_this, 'loading', false);
        });

      } else {
        var dateDepth = get(this, 'dateDepth');
        var weeksAgo = window.moment().day(-7 * dateDepth).toDate();
        this._getWodsOlderThan(weeksAgo).then(function(wods){
          set(_this, 'wods', wods);
          set(_this, 'searching', date);
          set(_this, 'loading', false);
        });
      }
    }
  }
});
