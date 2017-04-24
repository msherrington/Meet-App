angular
  .module('meetApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersNewCtrl', UsersNewCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User){
  const vm = this;

  vm.all = User.query();
}

UsersNewCtrl.$inject = ['User', '$state'];
function UsersNewCtrl(User, $state){
  const vm = this;

  vm.countries = User.query();

  function submit(){
    User.save(vm.user)
      .$promise
      .then(() => $state.go('usersIndex'));
  }
  vm.submit = submit;
}

UsersShowCtrl.$inject = ['User', '$stateParams', '$state', 'Conversation', '$auth'];
function UsersShowCtrl(User, $stateParams, $state, Conversation, $auth){
  const vm = this;
  vm.currentUser = $auth.getPayload();
  // console.log(vm.currentUser.id);
  User.get($stateParams).$promise.then((user)=> {
    vm.user = user;
  });
  // console.log(parseFloat($stateParams.id));

  //Tabs
  vm.tab = 1;
  vm.setTab = function(newTab){
    // console.log('clicked');
    vm.tab = newTab;
  };

  vm.isSet = function(tabNum){
    return vm.tab === tabNum;
  };

  function usersDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('usersIndex'));
  }

  vm.delete = usersDelete;

  vm.conversation = { receiver_id: parseInt($stateParams.id), sender_id: vm.currentUser.id };

  // console.log(vm.conversation);
  function conversationCreate() {
    Conversation
    .save({sender_id: vm.currentUser.id, receiver_id: parseInt($stateParams.id), conversation: vm.conversation})
    .$promise
    .then();
  }
  vm.conversationCreate = conversationCreate;
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  User.get($stateParams).$promise.then((user) => {
    vm.user = user;
  });

  function usersUpdate() {
    // wrap the data in a `user` object and pass the user's id
    // to the model so it can generate the correct URL
    User
      .update({ id: vm.user.id, user: vm.user})
      .$promise
      .then(() => $state.go('usersShow', $stateParams));
  }
  vm.update = usersUpdate;
}
