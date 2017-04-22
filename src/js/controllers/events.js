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
    console.log('clicked');
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

  // ng change function, maybe?
  function change(){
    vm.event.tickets_left = vm.event.max_tickets;
  }
  vm.change = change;


  function eventsCreate() {
    //Wrap data in an event object//
    Event
      .save({ event: vm.event })
      .$promise
      .then(() => $state.go('eventsIndex'));
  }
  vm.create = eventsCreate;
}

EventsShowCtrl.$inject = ['Event', 'User', 'Comment','Ticket', '$stateParams', '$state', '$auth', '$uibModal'];
function EventsShowCtrl(Event, User, Comment, Ticket, $stateParams, $state, $auth, $uibModal) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.event = Event.get($stateParams);

  function openModal() {
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
  vm.open = openModal;

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


  function isAttending() {
    return $auth.getPayload() && vm.event.$resolved && vm.event.users.map((object) => object.id).includes(vm.currentUser.id);
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
    Event
    .update({id: vm.event.id, event: vm.event })
    .$promise
    .then(() => $state.go('eventsShow', $stateParams));
  }
  vm.update = eventsUpdate;
}

EventsDeleteCtrl.$inject = ['$uibModalInstance', 'currentEvent', '$state'];
function EventsDeleteCtrl($uibModalInstance, currentEvent, $state) {
  const vm = this;
  vm.event = currentEvent;
  console.log(vm.event.comments);

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
