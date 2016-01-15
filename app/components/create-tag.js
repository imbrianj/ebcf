import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createTag: function() {
      var tagValue = this.get('newTag');

      this.sendAction('closeModal', tagValue);
    },
    close() {
      // this.sendAction('closeModal')
      // $('.modal').modal('close');
    }
  }
});
