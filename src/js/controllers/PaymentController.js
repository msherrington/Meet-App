angular
  .module('meetApp')
  .controller('PaymentController', PaymentController);

PaymentController.$inject = ['API_URL', '$http', '$window', '$state', '$stateParams', 'Event', 'User'];
function PaymentController(API_URL, $http, $window, $state, $stateParams, Event, User) {
  const vm = this;
  let requester;
  const Stripe = $window.Stripe;

  vm.card = {};
  vm.donation ={};
  vm.currency = 'gbp';
  vm.paymentSuccessful = false;

  Event
    .get($stateParams)
    .$promise
    .then(response =>{
      vm.event = response;
    });

  function paymentTransaction(data){
    $http
        .post(`${API_URL}/charges`, data)
        .then((res) => {
          if(res.status === 200) {
            vm.paymentSuccessful = true;

          } else {
            vm.paymentSuccessful = false;
          }
        });
  }

  vm.pay = function pay() {
    const tokenData = angular.copy(vm.card);
    delete tokenData.amount;
    Stripe.card.createToken(tokenData, (status, response) => {
      const data = {
        card: vm.card,
        token: response.id,
        payee: vm.card.payee,
        amount: vm.event.price * 100,
        currency: vm.currency
      };
      paymentTransaction(data);
      // createDonation();
      // create ticket??
    });
  };

  // vm.reset = function() {
  //   vm.card = {};
  //   vm.payee = '';
  //   vm.amount = null;
  //   vm.paymentSuccessful = false;
  //   vm.Form.$setPristine(true);
  // };
  // function createDonation(){
  //   vm.donation.project_id = $stateParams.id;
  //   vm.donation.amount = vm.card.amount;
  //   Donation
  //   .save(vm.donation)
  //   .$promise
  //   .then(()=> $state.go('projectsIndex'));
  // }

  //CREATE TICKET FUNCTION GOES HERE??
  //AND EMAIL FUNCTION??
}
