angular
  .module('ruthless-test-front')
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsEditCtrl', EventsEditCtrl);

EventsIndexCtrl.$inject = ['Event'];
function EventsIndexCtrl(Event){
  const vm = this;

  vm.all = Event.query();

  console.log(vm.all);

}

EventsNewCtrl.$inject = ['Event', 'User', '$state'];
function EventsNewCtrl(Event, User, $state) {
  const vm = this;
  vm.event = {};
  vm.users = User.query();

  function eventsCreate() {
    //Wrap data in an event object//
    Event
      .save({ event: vm.event })
      .$promise
      .then(() => $state.go('eventsIndex'));
  }

  vm.create = eventsCreate;
}

// BirdsNewCtrl.$inject = ['Bird', '$state'];
// function BirdsNewCtrl(Bird, $state) {
//   const vm = this;
//   vm.bird = {};
//
//   function birdsCreate() {
//     // wrap the data in a `bird` object
//     Bird
//       .save({ bird: vm.bird })
//       .$promise
//       .then(() => $state.go('birdsIndex'));
//   }
//
//   vm.create = birdsCreate;
// }


EventsShowCtrl.$inject = ['Event', 'User', 'Comment', '$stateParams', '$state', '$auth'];
function EventsShowCtrl(Event, User, Comment, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.event = Event.get($stateParams);

  function eventsDelete() {
    vm.event
      .$remove()
      .then(() => $state.go('eventsIndex'));
  }

  vm.delete = eventsDelete;

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

  // function toggleAttending() {
  //   const index = vm.event.attendee_ids.indexOf(vm.currentUser.id);
  //   if (index > -1) {
  //     vm.event.attendee_ids.splice(index, 1);
  //     vm.event.attendees.splice(index, 1);
  //   } else {
  //     vm.event.attendee_ids.push(vm.currentUser.id);
  //     vm.event.attendees.push(vm.currentUser);
  //   }
  //   eventsUpdate();
  // }
  //
  // vm.toggleAttending = toggleAttending;
  //
  // function isAttending() {
  //   return $auth.getPayload() && vm.event.$resolved && vm.event.attendee_ids.includes(vm.currentUser.id);
  // }
  //
  // vm.isAttending = isAttending;
}



EventsEditCtrl.$inject = ['Event', '$stateParams', '$state'];
function EventsEditCtrl(Event, $stateParams, $state) {
  const vm = this;

  // vm.event = Event.get($stateParams);
  // vm.event = Event.get($stateParams);

  Event.get($stateParams).$promise.then((event) => {
    vm.event = event;
    vm.event.date = new Date(event.date);
  });

  function eventsUpdate() {
    // if (vm.eventForm.$valid) {
    Event
    .update({id: vm.event.id, event: vm.event })
    .$promise
    // vm.event

    // .$update()
    .then(() => $state.go('eventsShow', $stateParams));
  }
  // }
  vm.update = eventsUpdate;
}

// BirdsEditCtrl.$inject = ['Bird', '$stateParams', '$state'];
// function BirdsEditCtrl(Bird, $stateParams, $state) {
//   const vm = this;
//
//   vm.bird = Bird.get($stateParams);
//
//   function birdsUpdate() {
//     // wrap the data in a `bird` object and pass the bird's id
//     // to the model so it can generate the correct URL
//     Bird.update({ id: vm.bird.id, bird: vm.bird })
//       .$promise
//       .then(() => $state.go('birdsShow', $stateParams));
//   }
//
//   vm.update = birdsUpdate;
// }
