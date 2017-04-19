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

UsersShowCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersShowCtrl(User, $stateParams, $state){
  const vm = this;

  vm.user = User.get($stateParams);

  function usersDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('usersIndex'));
  }

  vm.delete = usersDelete;
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  User.get($stateParams).$promise.then((user) => {
    vm.user = user;
  });

  function usersUpdate() {
    // wrap the data in a `user` object and pass the bird's id
    // to the model so it can generate the correct URL
    User
      .update({ id: vm.user.id, user: vm.user})
      .$promise
      .then(() => $state.go('usersShow', $stateParams));
  }

  vm.update = usersUpdate;

}
