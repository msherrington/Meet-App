angular
  .module('meetApp')
  .controller('TicketsConfirmCtrl', TicketsConfirmCtrl);

TicketsConfirmCtrl.$inject = ['Event', 'User','Ticket', '$stateParams', '$auth', '$state'];
function TicketsConfirmCtrl(Event, User, Ticket, $stateParams, $auth, $state) {
  const vm = this;
  vm.ticket = {};
  vm.event = Event.get($stateParams);
  vm.currentUserId = $auth.getPayload();

  //Pull in tickets from factory
  Ticket.query()
    .$promise
    .then((tickets)=>{
      vm.all = tickets;
      console.log(tickets);
    });

  // console.log('eventId: ', $stateParams.id);
  // console.log('userId: ', $auth.getPayload().id);

  // console.log(vm.tickets)

  function ticketCreate() {
    vm.ticket.event_id = vm.event.id;

    Ticket
      .save({ ticket: vm.ticket })
      .$promise
      .then(() => $state.go('eventsAttend', { id: vm.event.id }));
  }
  vm.create = ticketCreate;

  // console.log(vm.ticket)

  function ticketDelete() {

      //Function to find id of ticket that matches user id
      var attendeesArray = [];
      for(var i =0; i< vm.event.tickets.length; i++){
        // console.log(vm.event.tickets[i].user.id);
        // console.log(vm.event.tickets[i].user);
        attendeesArray.push(vm.event.tickets[i].user.id);
      }
      for(i = 0; i < attendeesArray.length; i++) {
        // console.log(attendeesArray[i]);
        // console.log(vm.currentUserId);
        if(vm.currentUserId.id === attendeesArray[i]){
          console.log('Ticket Found!');
          console.log(attendeesArray[i]);
          var ticketIndex = i;
        } else{
          console.log('not your ticket!');
        }
      }
      console.log(ticketIndex + ' TICKET INDEX ')
      console.log(vm.all[ticketIndex]);
      const ticket = vm.all[ticketIndex];
      Ticket
          .delete({ id: ticket.id, ticket: ticket })
          .$promise
          .then(() => {
            const index = vm.event.tickets[ticketIndex];
            vm.event.tickets.splice(index, 1);
            $state.go('eventsIndex');
          });

    //   function deleteComment(comment) {
    //     Comment
    //     .delete({ id: comment.id })
    // .$promise
    // .then(() => {
    //   const index = vm.event.comments.indexOf(comment);
    //   vm.event.comments.splice(index, 1);
    // });
// }

      console.log(vm.event.tickets[ticketIndex] + " To be deleted")
      console.log(vm.event.tickets[ticketIndex].id)
      console.log(vm.event.tickets[ticketIndex].user)
      // console.log(vm.event.tickets[ticketIndex].event_id)

      // vm.ticket
        // .$remove({ id: vm.ticket.id } )
      //   .$remove()
      //   .$promise
      //   .then(() => {
          // $state.go('eventsUnattend');
      //   });
    }
    vm.delete = ticketDelete;
}
