import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('create-rental');
  this.route('create-wod');
  this.route('wods');
  this.route('wod', { path: '/wod/:wod_id' });
  this.route('edit-wod', { path: 'wod/:wod_id/edit' });
  this.route('tag', { path: '/tag/:tag_id'});
  this.route('getting-started');
  this.route('schedule');
  this.route('pricing');

});

export default Router;
