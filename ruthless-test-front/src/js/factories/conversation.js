angular
  .module('ruthless-test-front')
  .factory('Conversation', Conversation);

Conversation.$inject = ['$resource', 'API_URL'];
function Conversation($resource, API_URL) {
  return new $resource(`${API_URL}/conversations`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
