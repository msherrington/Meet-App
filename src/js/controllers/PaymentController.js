angular
  .module('meetApp')
  .controller('PaymentController', PaymentController);

PaymentController.$inject = ['API_URL', '$http', '$window', '$state', '$stateParams', 'Event', 'User', 'Ticket'];
function PaymentController(API_URL, $http, $window, $state, $stateParams, Event, User, Ticket) {
  const vm = this;
  let requester;
  const Stripe = $window.Stripe;
  vm.ticket = {};
  vm.card = {};
  vm.donation ={};
  vm.currency = 'gbp';
  vm.paymentSuccessful = false;

  console.log($state);

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
      ticketCreate();
      // create ticket??

    });
  };

  function ticketCreate() {
    vm.ticket.event_id = vm.event.id;

    Ticket
      .save({ ticket: vm.ticket })
      .$promise
      .then(() => $state.go('eventsAttend', { id: vm.event.id }));
  }
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
