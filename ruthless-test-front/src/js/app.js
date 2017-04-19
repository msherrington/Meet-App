angular
  .module('meetApp', ['ngResource', 'ui.router', 'satellizer', 'checklist-model'])
  .constant('API_URL', 'http://localhost:3000/api');
