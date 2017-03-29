import Ember from 'ember';

const { on, run, $, Component } = Ember;

export default Component.extend({
  tagName: '',
  initializeComponent: on('didInsertElement', function() {
    run.scheduleOnce('afterRender', () => {
      $('.ui.sidebar .item').on('click', () => {
        $('.ui.sidebar').sidebar('hide');
      });
    });
  }),
});
