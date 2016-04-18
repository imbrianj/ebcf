import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  initializeComponent: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', () => {
      Ember.$('.ui.sidebar .item').on('click', () => {
        Ember.$('.ui.sidebar').sidebar('hide');
      });
    });
  })
});
