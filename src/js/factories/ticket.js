angular
  .module('meetApp')
  .factory('Ticket', Ticket);

Ticket.$inject = ['$resource', 'API_URL'];
function Ticket($resource, API_URL){
  return new $resource(`${API_URL}/tickets/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
