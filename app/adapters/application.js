import JSONAPIAdapter from 'ember-data/adapters/json-api';

// export default DS.RESTAdapter.extend({
export default JSONAPIAdapter.extend({
  namespace: 'api/v1',
	// host: 'http://localhost:4500'
});
