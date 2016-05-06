import Ember from 'ember';
import EmberCookieInitializer from 'ebcf/initializers/ember-cookie';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | ember cookie', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  EmberCookieInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
