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

  function ticketRoute() {
    if (vm.event.price === 0){
      console.log('not zero');
    } else {
      console.log('not zero');
    }
  }
  vm.route = ticketRoute;

  function ticketDelete() {
    const ticket = vm.event.tickets.find((ticket) => {
      return ticket.user.id === vm.currentUserId;
    });

    Ticket
      .remove({ id: ticket.id })
      .$promise
      // .then(() => closeModal());
      .then(() => $state.go('eventsShow', { id: vm.event.id }, { reload: true }));

    closeModal();
  }
  vm.delete = ticketDelete;
}
