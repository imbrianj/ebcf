import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute: key => {
    return key;
  },
  keyForRelationship: key => {
    return key;
  }
  // primaryKey: '_id'
  //     // serializeId: function(id) {
  //     //     return id.toString();
  //     // }
});
