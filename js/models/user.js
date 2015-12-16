angular
  .module('devigner')
  .factory('User', User);

User.$inject = ['$resource', 'API_URL'];

function User($resource, API_URL) {
  return $resource(
    API_URL+ '/users/:id',
    {id: '@_id'},
    {
      'get': {method: 'GET'},
      'update': {method: 'PUT'},
      'save': {method: 'POST'},
      'query': {method: 'GET', isArray: false},
      'remove': {method: 'DELETE'},
      'delete': {method: 'DELETE'},
      'login': {
        url: API_URL + '/login',
        method: 'POST'
      },
      'signup': {
        url: API_URL + '/signup',
        method: 'POST'
      }
    }
  );
}