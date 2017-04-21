angular
  .module('meetApp')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  $authProvider.github({
    clientId: '22feb4eb3c5b5fa23e1d',
    url: `${API_URL}/oauth/github`
  });
  $authProvider.facebook({
    clientId: '285230671929861',
    url: `${API_URL}/auth/facebook`
  });
}
