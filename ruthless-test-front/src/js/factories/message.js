angular
  .module('ruthless-test-front')
  .factory('Message', Message);

Message.$inject = ['$resource', 'API_URL'];
function Message($resource, API_URL) {
  return new $resource(`${API_URL}/messages/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
