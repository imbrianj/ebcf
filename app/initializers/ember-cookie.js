export function initialize(application) {
  application.inject('component', 'cookie', 'cookie:main');
  application.inject('service', 'cookie', 'cookie:main');
}

export default {
  name: 'ember-cookie',
  after: ['cookie'],
  initialize,
};
