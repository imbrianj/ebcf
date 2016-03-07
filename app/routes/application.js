import Ember from 'ember';

export default Ember.Route.extend({
  // model: function() {
	// 	return this.store.findAll('note');
	// }
  // actions: {
  //   openModal: function(modalName) {
  //     debugger;
  //     return this.render(modalName, {
  //       into: 'application',
  //       outlet: 'modal'
  //     });
  //   }
  // }
  actions: {
    tagButtonSelected: function(tag) {
      this.transitionTo('wods', {queryParams: {tagValue: tag}});
    }
  }
});
