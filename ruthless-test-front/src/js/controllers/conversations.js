angular
  .module('ruthless-test-front')
  .controller('ConversationsIndexCtrl', ConversationsIndexCtrl)
  .controller('ConversationsShowCtrl', ConversationsShowCtrl);
  // .controller('ConversationsShowCtrl', ConversationsShowCtrl)
  // .controller('ConversationsEditCtrl', ConversationsEditCtrl);

ConversationsIndexCtrl.$inject = ['Conversation'];
function ConversationsIndexCtrl(Conversation) {
  const vm = this;

  vm.all = Conversation.query();
}

// ConversationsNewCtrl.$inject = ['Conversation', 'User', '$state'];
// function ConversationsNewCtrl(Conversation, User, $state) {
//   const vm = this;
//   vm.event = {};
//   vm.users = User.query();
//
//   function eventsCreate() {
//     Conversation
//       .save({ event: vm.event })
//       .$promise
//       .then(() => $state.go('eventsIndex'));
//   }
//
//   vm.create = eventsCreate;
// }
//
ConversationsShowCtrl.$inject = ['Conversation', 'User', 'Message', '$stateParams', '$state', '$auth'];
function ConversationsShowCtrl(Conversation, User, Message, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.conversation = Conversation.query($stateParams);
  console.log(vm.conversation);


  function conversationsDelete() {
    vm.conversation
      .$remove()
      .then(() => $state.go('conversationsIndex'));
  }

  vm.delete = conversationsDelete;

  function addMessage() {
    vm.message.conversation_id = vm.conversation.id;

    Message
      .save({ message: vm.message })
      .$promise
      .then((message) => {
        vm.conversation.messages.push(message);
        vm.message = {};
      });
  }

  vm.addMessage = addMessage;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.event.comments.indexOf(comment);
        vm.event.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;

}

// ConversationsEditCtrl.$inject = ['Conversation', 'User', '$stateParams', '$state'];
// function ConversationsEditCtrl(Conversation, User, $stateParams, $state) {
//   const vm = this;
//
//   Conversation.get($stateParams).$promise.then((event) => {
//     vm.event = event;
//     vm.event.date = new Date(event.date);
//   });
//
//   vm.users = User.query();
//
//   function eventsUpdate() {
//     Conversation
//       .update({id: vm.event.id, event: vm.event })
//       .$promise
//       .then(() => $state.go('eventsShow', { id: vm.event.id }));
//   }
//
//   vm.update = eventsUpdate;
// }
