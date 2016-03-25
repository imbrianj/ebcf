import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateCallout(){
      var _this = this;
      this.get('callout').save().then(function() {
        _this.transitionToRoute('/');
      });
    }
  }
});
