angular
  .module('meetApp')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  $authProvider.github({
    clientId: 'd22c7df7a284b74ea5c8',
    url: `${API_URL}/oauth/github`
  });
  $authProvider.facebook({
    clientId: '680991948746989',
    url: `${API_URL}/auth/facebook`
  });
}
