angular
  .module('meetApp', ['ngResource', 'ui.router', 'satellizer', 'checklist-model', 'ui.bootstrap', 'ngAnimate'])
  .constant('API_URL', 'http://localhost:3000/api');
