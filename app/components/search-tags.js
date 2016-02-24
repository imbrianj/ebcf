import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    tagsEntered: function(component, id) {
      this.sendAction('searchInputChanged', id);
    }
  }
});
