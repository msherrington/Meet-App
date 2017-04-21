angular
  .module('meetApp')
  .factory('Message', Message);

Message.$inject = ['$resource', 'API_URL'];
function Message($resource, API_URL) {
  return new $resource(`${API_URL}/conversations/:conversationId/messages/:id`, {
    id: '@id', conversationId: '@conversationId'
  }, {
    update: { method: 'PUT' }
  });
}
