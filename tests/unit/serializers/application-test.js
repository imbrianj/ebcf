import { moduleForModel, test } from 'ember-qunit';

moduleForModel('application', 'Unit | Serializer | application', {
  needs: ['serializer:application'],
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
