import DS from 'ember-data';

// export default DS.RESTAdapter.extend({
export default DS.JSONAPIAdapter.extend({
  namespace: 'api/v1',
	// host: 'http://localhost:4500'
});
