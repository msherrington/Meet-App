angular.module('meetApp')
.controller('MessagesIndexCtrl', MessagesIndexCtrl);

MessagesIndexCtrl.$inject = ['Message', '$stateParams'];
function MessagesIndexCtrl(Message, $stateParams) {
  const vm = this;
  vm.messages = Message.query({ conversationId: $stateParams.id });
  console.log(vm.messages);
  // vm.message = {};
  function addMessage() {
    console.log({ conversationId: $stateParams.id, message: vm.message });
    Message
      .save({ conversationId: $stateParams.id, message: vm.message })
      .$promise
      .then((message) => {
        vm.messages.push(message);
        vm.message = {};
      });
  }
  vm.reply = addMessage;
}
