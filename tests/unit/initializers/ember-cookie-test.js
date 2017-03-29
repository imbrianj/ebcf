import Ember from 'ember';
import EmberCookieInitializer from 'ebcf/initializers/ember-cookie';
import { module, test } from 'qunit';

const { run, Application } = Ember;

let application;

module('Unit | Initializer | ember cookie', {
  beforeEach() {
    run(function() {
      application = Application.create();
      application.deferReadiness();
    });
  },
});

// Replace this with your real tests.
test('it works', function(assert) {
  EmberCookieInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
