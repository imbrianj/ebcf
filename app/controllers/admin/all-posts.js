import Ember from 'ember';

const {
  computed,
  Controller,
} = Ember;

export default Controller.extend({
  sortProps: ['date:desc'],
  sortedPosts: computed.sort('posts', 'sortProps'),
});
