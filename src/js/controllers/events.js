angular
  .module('meetApp')
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsEditCtrl', EventsEditCtrl)
  .controller('EventsDeleteCtrl', EventsDeleteCtrl);

EventsIndexCtrl.$inject = ['Event', 'filterFilter', 'orderByFilter', '$http', '$scope'];
function EventsIndexCtrl(Event, filterFilter, orderByFilter, $http, $scope){
  const vm = this;

  Event.query()
    .$promise
    .then((events)=>{
      vm.all = events;
      filterEvents();
    });

  //Tabs
  vm.tab = 1;

  vm.setTab = function(newTab){
    // console.log('clicked');
    vm.tab = newTab;
  };

  vm.isSet = function(tabNum){
    return vm.tab === tabNum;
  };

  // Function for searching and filtering through events
  function filterEvents() {
    const params = { name: vm.q };

    vm.filtered = filterFilter(vm.all, params);
    vm.filtered = orderByFilter(vm.filtered, vm.sort);
  }
  $scope.$watchGroup([
    () => vm.q,
    () => vm.sort
  ], filterEvents);
}

EventsNewCtrl.$inject = ['Event', 'User', '$state'];
function EventsNewCtrl(Event, User, $state) {
  const vm = this;
  vm.event = {};
  vm.users = User.query();
  vm.currentDate = new Date();

  function eventsCreate() {
    //Wrap data in an event object//
  if(vm.eventsForm.$valid){
    Event
      .save({ event: vm.event })
      .$promise
      .then(() => $state.go('eventsIndex'));
    }
  }
  vm.create = eventsCreate;
}

EventsShowCtrl.$inject = ['Event', 'User', 'Comment','Ticket', '$stateParams', '$state', '$auth', '$uibModal'];
function EventsShowCtrl(Event, User, Comment, Ticket, $stateParams, $state, $auth, $uibModal) {
  const vm = this;
  vm.ticket = {};

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.event = Event.get($stateParams);

  function ticketRoute() {
    if (vm.event.price === 0){
      attendModal();
      ticketCreate();
    } else {
      // paymentModal();
      $state.go('payment', $stateParams);
    }
  }
  vm.route = ticketRoute;

  function ticketCreate() {
    vm.ticket.event_id = vm.event.id;

    Ticket
      .save({ ticket: vm.ticket })
      .$promise
      .then(() => $state.go('eventsShow', { id: vm.event.id }, { reload: true }));
  }
  vm.create = ticketCreate;

  // Modal to confirm attendance of free event
  function attendModal() {
    $uibModal.open({
      templateUrl: 'js/views/partials/EventAttendModal.html',
      controller: 'TicketsCtrl as tickets'
    });
  }
  vm.attend = attendModal;

  // Modal to confirm ticket has been deleted
  function unattendModal() {
    $uibModal.open({
      templateUrl: 'js/views/partials/EventUnattendModal.html',
      controller: 'TicketsCtrl as tickets'
    });
  }
  vm.unattend = unattendModal;

  // Opens modal asking for confirmation to delete event
  function eventDeleteModal() {
    $uibModal.open({
      templateUrl: 'js/views/partials/EventDeleteModal.html',
      controller: 'EventsDeleteCtrl as eventsDelete',
      resolve: {
        currentEvent: () => {
          return vm.event;
        }
      }
    });
  }
  vm.open = eventDeleteModal;

  function addComment() {
    vm.comment.event_id = vm.event.id;

    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.event.comments.push(comment);
        vm.comment = {};
      });
  }

  vm.addComment = addComment;

  // Function to delete a comment
  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.event.comments.indexOf(comment);
        vm.event.comments.splice(index, 1);
      });
  }
  vm.deleteComment = deleteComment;

  // Function for displaying or hiding attendance buttons
  function isAttending() {
    return $auth.getPayload() && vm.event.$resolved && vm.event.users.map((object) => object.id).includes(vm.currentUser.id);
    // This map function takes all id values from inside event.users object, puts the values into an array and checks that array to see if it includes the current user id.
  }
  vm.attending = isAttending;
}


EventsEditCtrl.$inject = ['Event', '$stateParams', '$state'];
function EventsEditCtrl(Event, $stateParams, $state) {
  const vm = this;

  Event.get($stateParams).$promise.then((event) => {
    vm.event = event;
    vm.event.date = new Date(event.date);
  });

  function eventsUpdate() {
    if(vm.eventsForm.$valid){
      Event
      .update({id: vm.event.id, event: vm.event })
      .$promise
      .then(() => $state.go('eventsShow', $stateParams));
    }
  }
  vm.update = eventsUpdate;
}


EventsDeleteCtrl.$inject = ['$uibModalInstance', 'currentEvent', '$state'];
function EventsDeleteCtrl($uibModalInstance, currentEvent, $state) {
  const vm = this;
  vm.event = currentEvent;
  // console.log(vm.event.comments);

  function closeModal() {
    $uibModalInstance.close();
  }
  vm.close = closeModal;

  function eventsDelete() {
    vm.event
      .$remove()
      .then(() => {
        $state.go('eventsIndex');
        $uibModalInstance.close();
      });
  }
  vm.delete = eventsDelete;

}
