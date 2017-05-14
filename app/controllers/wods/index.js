import Ember from 'ember';
import InfiniteScrollMixin from 'ebcf/mixins/infinite-scroll';
import { task } from 'ember-concurrency';

const {
  computed,
  get,
  isPresent,
  set,
  Controller,
} = Ember;

export default Controller.extend(InfiniteScrollMixin, {
  queryParams: ['tag', 'date'],
  tag: null,
  date: null,
  dateDepth: 0,
  loadingMore: false,

  sortProps: ['date:desc'],
  sortedWods: computed.sort('enabledWods', 'sortProps'),
  enabledWods: computed.filterBy('_wodsTask.lastSuccessful.value', 'active', true),

  searching: computed.or('tag', 'date'),

  selectedTag: computed('tag', function() {
    const tags = get(this, 'tags');
    const tagValue = get(this, 'tag');

    return get(tags.filterBy('value', tagValue), 'firstObject');
  }),

  dataIsPending: computed.readOnly('_wodsTask.last.isRunning'),
  dataIsFulfilled: computed.readOnly('_wodsTask.last.isFinished'),
  dataIsRejected: computed.notEmpty('_wodsTask.last.error'),

  _wodsTask: task(function* () {
    let tag = get(this, 'tag');
    let date = get(this, 'date');

    if (isPresent(tag)) {
      const selectedTag = get(this, 'selectedTag');
      set(this, 'dateDepth', 0);
      set(this, 'loadingMore', false);
      return yield get(selectedTag, 'wods');
    } else if (isPresent(date)) {
      let day = window.moment(date).utc().startOf('day').toISOString();
      set(this, 'dateDepth', 0);
      set(this, 'loadingMore', false);
      return yield this.store.query('wod', {
        filter: {
          simple: {
            date: day,
            enabled: true,
          },
        },
      });
    } else {
      const dateDepth = get(this, 'dateDepth') + 2;
      const weeksAgo = window.moment().day(-7 * dateDepth).toDate();
      set(this, 'dateDepth', dateDepth);

      return yield this.store.query('wod', {
        filter: {
          simple: {
            publishDate: {
              $gt: weeksAgo,
              $lt: window.moment().toDate(),
            },
            enabled: true,
          },
        },
      });
    }
  }).drop(),

  wodsFound: computed('sortedWods.length', function() {
    let numberOfWods = get(this, 'sortedWods.length');
    let res = '';

    if (numberOfWods === 1) {
      res =  `${numberOfWods} Wod Found for `;
    } else {
      res = `${numberOfWods} Wods Found for `;
    }

    let tag = get(this, 'tag');
    let date = get(this, 'date');

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
            $lt: window.moment().toDate(),
          },
          enabled: true,
        },
      },
    });
  },

  actions: {
    getOlder() {
      if (get(this, 'searching')) {
        return;
      }
      set(this, 'loadingMore', true);
      get(this, '_wodsTask').perform();
    },

    tagEntered(selectedTag) {
      set(this, 'tag', get(selectedTag, 'value'));
    },

    clearSearch() {
      set(this, 'tag', null);
      set(this, 'date', null);
    },
  },
});
