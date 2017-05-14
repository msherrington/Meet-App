angular.module('meetApp')
  .controller('MessagesIndexCtrl', MessagesIndexCtrl);

MessagesIndexCtrl.$inject = ['Message', '$stateParams', '$auth'];
function MessagesIndexCtrl(Message, $stateParams, $auth) {
  const vm = this;
  vm.currentUser = $auth.getPayload();
  vm.messages = Message.query({ conversationId: $stateParams.id });
  function addMessage() {
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
