import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    tagsEntered: function(component, id, value) {
      this.sendAction('searchInputChanged', id, value);
    }
  }
});
