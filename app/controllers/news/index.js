import Ember from 'ember';
import InfiniteScrollMixin from 'ebcf/mixins/infinite-scroll';
import { task } from 'ember-concurrency';

const {
  computed,
  get,
  isPresent,
  Controller,
} = Ember;

export default Controller.extend({
  sortProps: ['date:desc'],
  sortedPosts: computed.sort('enabledPosts', 'sortProps'),
  enabledPosts: computed.filterBy('_postTask.lastSuccessful.value', 'enabled', true),

  _postTask: task(function* () {
    let searchQuery = get(this, 'searchQuery');
    if (isPresent(searchQuery)) {
      return yield this.store.query('post', {
        filter: {
          simple: {
            title: {
              $regex: `${searchQuery}`,
              $options: '-i',
            },
          },
        },
      });
    } else {
      return yield this.store.query('post', {
        filter: {
          simple: {
            publishDate: {
              $lt: window.moment().toDate(),
            },
            enabled: true,
          },
        },
      });
    }
  }).restartable(),

  actions: {
    filterPosts() {
      get(this, '_postTask').perform();
    },
  },
});
