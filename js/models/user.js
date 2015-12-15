angular
  .module('devigner')
  .factory('User', User);

User.$inject = ['$resource', 'API'];

function User($resource, API) {
  return $resource(
    API+ '/users/:id',
    {id: '@id'},
    {
      'get': {method: 'GET'},
      'save': {method: 'POST'},
      'query': {method: 'GET', isArray: false},
      'remove': {method: 'DELETE'},
      'delete': {method: 'DELETE'},
      'login': {
        url: API + '/login',
        method: 'POST'
      },
      'signup': {
        url: API + '/signup',
        method: 'POST'
      }
    }
  );
}