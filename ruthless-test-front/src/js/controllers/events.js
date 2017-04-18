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
    Event
      .save({ event: vm.event })
      .$promise
      .then(() => $state.go('eventsIndex'));
  }

  vm.create = eventsCreate;
}

// EventsNewCtrl.$inject = ['Event', '$state'];
// function EventsNewCtrl(Event, $state){
  // const vm = this;

  // vm.countries = Event.query();

//   function submit(){
//     Event.save(vm.event)
//       .$promise
//       .then(() => $state.go('eventsIndex'));
//   }
//
//   vm.submit = submit;
// }

EventsShowCtrl.$inject = ['Event', '$stateParams', '$state']
function EventsShowCtrl(Event, $stateParams, $state){
  const vm = this;

  vm.event = Event.get($stateParams);
  console.log(vm.event)

  function eventsDelete() {
    vm.event
      .$remove()
      .then(() => $state.go('eventsIndex'));
  }

  vm.delete = eventsDelete;
}

EventsEditCtrl.$inject = ['Event', '$stateParams', '$state'];
function EventsEditCtrl(Event, $stateParams, $state) {
  const vm = this;
    vm.event = Event.get($stateParams);

  function eventsUpdate() {
    // if (vm.eventForm.$valid) {
      vm.event
      .$update()
      .then(() => $state.go('eventsShow', $stateParams));
    }
  // }
  vm.update = eventsUpdate;
}
