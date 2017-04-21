angular
  .module('meetApp')
  .controller('TicketsConfirmCtrl', TicketsConfirmCtrl);

TicketsConfirmCtrl.$inject = ['Event', 'User','Ticket', '$stateParams', '$auth', '$state'];
function TicketsConfirmCtrl(Event, User, Ticket, $stateParams, $auth, $state) {
  const vm = this;
  vm.ticket = {};
  vm.event = Event.get($stateParams);
  vm.currentUserId = $auth.getPayload().id;

  function ticketCreate() {
    vm.ticket.event_id = vm.event.id;

    Ticket
      .save({ ticket: vm.ticket })
      .$promise
      .then(() => $state.go('eventsAttend', { id: vm.event.id }));
  }
  vm.create = ticketCreate;
  
  function ticketDelete() {
    const ticket = vm.event.tickets.find((ticket) => {
      return ticket.user.id === vm.currentUserId;
    });

    Ticket
      .remove({ id: ticket.id })
      .$promise
      .then(() => $state.go('eventsUnattend', { id: vm.event.id }));
  }
  vm.delete = ticketDelete;
}
