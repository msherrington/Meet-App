angular
  .module('ruthless-test-front')
  .controller('ConversationsIndexCtrl', ConversationsIndexCtrl);

ConversationsIndexCtrl.$inject = ['Conversation'];
function ConversationsIndexCtrl(Conversation) {
  const vm = this;

  vm.all = Conversation.query();
}
