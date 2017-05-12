angular
  .module('meetApp')
  .controller('AuthCtrl', AuthCtrl);

AuthCtrl.$inject = ['$auth', '$state'];
function AuthCtrl($auth, $state) {
  const vm = this;

  function register() {
    if(vm.registerForm.$invalid) return;
    $auth.signup(vm.user)
      .then(() => $state.go('login'));
  }

  vm.register = register;

  function login() {
    $auth.login(vm.credentials)
      .then(() => $state.go('eventsIndex'));
  }

  vm.login = login;
  function authenticate(provider) {
    $auth.authenticate(provider)
      .then(() => $state.go('eventsIndex'));
  }

  vm.authenticate = authenticate;
}
