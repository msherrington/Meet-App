angular.module('meetApp')
  .controller('MessagesIndexCtrl', MessagesIndexCtrl);

MessagesIndexCtrl.$inject = ['Message', '$stateParams', '$auth', 'Conversation'];
function MessagesIndexCtrl(Message, $stateParams, $auth, Conversation) {
  const vm = this;
  vm.currentUser = $auth.getPayload();
  vm.messages = Message.query({ conversationId: $stateParams.id });
  // vm.recipient = vm.messages[0];
  // console.log(vm.recipient);
  function addMessage() {
    // console.log({ conversationId: $stateParams.id, message: vm.message });
    Message
      .save({ conversationId: $stateParams.id, message: vm.message })
      .$promise
      .then((message) => {
        vm.messages.push(message);
        vm.message = {};
      });
  }
  vm.reply = addMessage;

  // function leftRight() {
  //   if (vm.message.user !== vm.currentUser) {
  //
  //   }
  // }
}
