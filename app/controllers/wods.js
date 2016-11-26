import Ember from 'ember';
import InfiniteScrollMixin from 'ebcf/mixins/infinite-scroll';

const {
  computed,
  get,
  isPresent,
  observer,
  set,
  Controller,
} = Ember;

export default Controller.extend(InfiniteScrollMixin, {
  queryParams: ['tag', 'date'],
  tag: null,
  date: null,
  sortProps: ['date:desc'],
  sortedWods: computed.sort('enabledWods', 'sortProps'),
  enabledWods: computed.filterBy('filteredWods', 'active', true),
  dateDepth: 2,
  loading: false,
  loadingMore: false,

  searching: computed.or('tag', 'date'),

  selectedTag: computed('tag', function() {
    const tags = get(this, 'tags');
    const tagValue = get(this, 'tag');

    return get(tags.filterBy('value', tagValue), 'firstObject');
  }),

  filteredWods: computed('tag', 'date', 'dateDepth', 'wods', function() {
    let tag = get(this, 'tag');
    let date = get(this, 'date');

    if (isPresent(tag)) {
      set(this, 'loadingMore', false);
      const selectedTag = get(this, 'selectedTag');
      return get(selectedTag, 'wods');
    } else if (isPresent(date)) {
      var day = window.moment(date).utc().startOf('day').toISOString();
      return this.store.query('wod', {
        filter: {
          simple: {
            date: day,
            enabled: true
          }
        }
      });
    } else {
      return get(this, 'wods');
    }
  }),

  wodsFound: computed('sortedWods.length', function() {
    var numberOfWods = get(this, 'sortedWods.length');
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
      res = res + tag.toUpperCase();
    }
    return res;
  }),

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
    getOlder() {
      if (get(this, 'searching')) {
        return;
      }

      set(this, 'loadingMore', true);
      let dateDepth = get(this, 'dateDepth');
      let weeksAgo = window.moment().day(-7 * dateDepth).toDate();
      let _this = this;

      this._getWodsOlderThan(weeksAgo).then(function(wods) {
        set(_this, 'wods', wods);
        set(_this, 'dateDepth', dateDepth + 2);
        set(_this, 'loadingMore', false);
      });
    },

    tagEntered(selectedTag) {
      set(this, 'tag', get(selectedTag, 'value'));
    },

    clearSearch() {
      set(this, 'tag', null);
      set(this, 'date', null);
    },
  }
});
