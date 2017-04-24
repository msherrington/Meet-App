angular
  .module('meetApp')
  .controller('PaymentCtrl', PaymentCtrl);

PaymentCtrl.$inject = ['API_URL', '$http', '$window', '$state', '$stateParams', 'Event', 'User', 'Ticket'];
function PaymentCtrl(API_URL, $http, $window, $state, $stateParams, Event, User, Ticket) {
  const vm = this;
  // let requester;
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
    });
  };

  function ticketCreate() {
    vm.ticket.event_id = vm.event.id;

    Ticket
      .save({ ticket: vm.ticket })
      .$promise
      .then();
  }
}
