import Ember from 'ember';
import InfiniteScrollMixin from 'ebcf/mixins/infinite-scroll';
import { module, test } from 'qunit';

module('Unit | Mixin | infinite scroll');

// Replace this with your real tests.
test('it works', function(assert) {
  let InfiniteScrollObject = Ember.Object.extend(InfiniteScrollMixin);
  let subject = InfiniteScrollObject.create();
  assert.ok(subject);
});
