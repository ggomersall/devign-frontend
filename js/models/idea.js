angular
  .module('devigner')
  .factory('Idea', Idea);

Idea.$inject = ['$resource', 'API_URL'];

function Idea($resource, API_URL) {
  return $resource(
    API_URL+ '/ideas/:id',
    {id: '@id'},
    {
      'get': {method: 'GET'},
      'save': {method: 'POST'},
      'query': {method: 'GET', isArray: false},
      'remove': {method: 'DELETE'},
      'delete': {method: 'DELETE'}
    }
  );
}