import Ember from 'ember';
import config from './config/environment';

const { Router } = Ember;

const AppRouter = Router.extend({
  location: config.locationType,
});

AppRouter.map(function() {
  this.route('about');
  this.route('coaches');
  this.route('contact');
  this.route('getting-started');
  this.route('schedule');
  this.route('pricing');

  this.route('wods');
  this.route('wod', { path: '/wod/:wod_id' });

  this.route('news');
  this.route('post', { path: '/post/:post_id' });

  this.route('admin', function() {
    this.route('all-wods');
    this.route('create-wod');
    this.route('edit-wod', { path: '/wod/:wod_id/edit' });

    this.route('callouts');
    this.route('create-callout');
    this.route('edit-callout', { path: '/callout/:callout_id/edit' });

    this.route('all-posts');
    this.route('create-post');
    this.route('edit-post', { path: '/post/:post_id/edit' });
    // this.route('bulk-tag-wods');
  });

  this.route('error', { path: '*path' });
});

export default AppRouter;
