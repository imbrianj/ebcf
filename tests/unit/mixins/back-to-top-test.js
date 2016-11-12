import Ember from 'ember';
import BackToTopMixin from 'ebcf/mixins/back-to-top';
import { module, test } from 'qunit';

module('Unit | Mixin | back to top');

// Replace this with your real tests.
test('it works', function(assert) {
  let BackToTopObject = Ember.Object.extend(BackToTopMixin);
  let subject = BackToTopObject.create();
  assert.ok(subject);
});
