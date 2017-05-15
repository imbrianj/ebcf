import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('coaches');
  this.route('contact');
  this.route('getting-started');
  this.route('schedule');
  this.route('pricing');

  this.route('wods', function() {
    this.route('wod', { path: '/:wod_id' });
  });

  this.route('wod', { path: '/wod/:wod_id' });

  this.route('news', function() {
    this.route('post', { path: '/post/:post_id' });
  });

  this.route('post', { path: '/post/:post_id' });

  this.route('bootcamp', function() {
    this.route('wod', { path: '/:bootcamp_id' });
  });

  this.route('admin', function() {
    this.route('callouts');
    this.route('create-callout');
    this.route('edit-callout', { path: '/callout/:callout_id/edit' });

    this.route('all-posts');
    this.route('create-post');
    this.route('edit-post', { path: '/post/:post_id/edit' });

    this.route('wods', function() {
      this.route('new');
      this.route('edit', { path: '/:wod_id/edit' });
      this.route('wod');
    });
    this.route('bootcamp', function() {
      this.route('new');
      this.route('edit', { path: '/:bootcamp_id/edit' });
    });
  });

  this.route('error', { path: '*path' });
});

export default Router;
