angular
  .module('meetApp')
  .controller('TicketsCtrl', TicketsCtrl);

TicketsCtrl.$inject = ['Event', 'User','Ticket', '$stateParams', '$auth', '$state', '$uibModalInstance'];
function TicketsCtrl(Event, User, Ticket, $stateParams, $auth, $state, $uibModalInstance) {
  const vm = this;
  vm.ticket = {};
  vm.event = Event.get($stateParams);
  vm.currentUserId = $auth.getPayload().id;

  function closeModal() {
    $uibModalInstance.close();
  }
  vm.close = closeModal;

  function ticketDelete() {
    const ticket = vm.event.tickets.find((ticket) => {
      return ticket.user.id === vm.currentUserId;
    });

    Ticket
      .remove({ id: ticket.id })
      .$promise
      .then(() => $state.go('eventsShow', { id: vm.event.id }, { reload: true }));

    closeModal();
  }
  vm.delete = ticketDelete;
}
