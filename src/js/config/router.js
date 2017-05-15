angular
  .module('meetApp')
  .config(Router);

Router.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];
function Router($urlRouterProvider, $locationProvider, $stateProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    //home state
    .state('home', {
      url: '/',
      templateUrl: 'js/views/statics/home.html',
      controller: 'MainCtrl as main'
    })
    //events states
    .state('eventsIndex', {
      url: '/events',
      templateUrl: 'js/views/events/index.html',
      controller: 'EventsIndexCtrl as eventsIndex'
    })
    .state('eventsNew', {
      url: '/events/new',
      templateUrl: 'js/views/events/new.html',
      controller: 'EventsNewCtrl as eventsNew'
    })
    .state('eventsShow', {
      url: '/events/:id',
      templateUrl: 'js/views/events/show.html',
      controller: 'EventsShowCtrl as eventsShow'
    })
    .state('eventsEdit', {
      url: '/events/:id/edit',
      templateUrl: 'js/views/events/edit.html',
      controller: 'EventsEditCtrl as eventsEdit'
    })
    //ticket states
    .state('eventsAttend', {
      url: '/events/:id/attend',
      templateUrl: 'js/views/tickets/attend.html',
      controller: 'TicketsCtrl as tickets'
    })
    //payment state
    .state('payment', {
      url: '/events/:id/payment',
      templateUrl: 'js/views/tickets/payment.html',
      controller: 'PaymentCtrl as payment'
    })
    //users states
    .state('usersIndex', {
      url: '/users',
      templateUrl: 'js/views/users/index.html',
      controller: 'UsersIndexCtrl as usersIndex'
    })
    .state('usersNew', {
      url: '/users/new',
      templateUrl: 'js/views/users/new.html',
      controller: 'UsersNewCtrl as usersNew'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: 'js/views/users/edit.html',
      controller: 'UsersEditCtrl as usersEdit'
    })
    // conversation state
    .state('conversationsIndex', {
      url: '/conversations',
      templateUrl: 'js/views/conversations/index.html',
      controller: 'ConversationsIndexCtrl as conversationsIndex'
    })
    // chat state
    .state('messagesIndex', {
      url: '/conversations/:id/messages',
      templateUrl: 'js/views/messages/index.html',
      controller: 'MessagesIndexCtrl as messagesIndex'
    })
    //auth states
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'AuthCtrl as auth'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'AuthCtrl as auth'
    });

  $urlRouterProvider.otherwise('/');
}
