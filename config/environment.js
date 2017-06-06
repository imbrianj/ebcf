/* jshint node: true */
'use strict'

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'ebcf',
    environment,
    rootURL: '/',
    locationType: 'auto',

    contentSecurityPolicy: {
      'style-src': "'self' 'unsafe-inline' https://*.googleapis.com",
      'script-src': "'self' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com",
      'img-src': "'self' http://ebcftest.s3.amazonaws.com/* https://s3-us-west-2.amazonaws.com/ebcf/assets/* http://jsawebsitepublic.s3.amazonaws.com/wp-content/uploads/ https://*.googleapis.com https://*.gstatic.com",
      'connect-src': "'self' http://localhost:4500 http://ebcftest.s3.amazonaws.com/ https://ebcftest.s3-us-west-2.amazonaws.com https://ebcf-server.herokuapp.com/",
      'font-src': "'self' data: https://fonts.gstatic.com/s/ https://*.gstatic.com",
      'media-src': "'self' https://s3-us-west-2.amazonaws.com/ebcftest/assets/ https://s3-us-west-2.amazonaws.com/ebcf/assets/",
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    moment: {
      includeTimezone: 'all',
    },

    metricsAdapters: [
      {
        name: 'FacebookPixel',
        environments: ['production'],
        config: {
          id: '254527551618257',
        },
      },
    ],
  };

  ENV['g-map'] = {
    key: 'AIzaSyA5rpm0k1V1fHLU4izXgOs9H7wa2ZS7E7U',
    protocol: 'https',
    draggable: false,
  };

  ENV.i18n = {
    defaultLocale: 'en',
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
