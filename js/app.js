angular
  .module('devigner', ['angular-jwt', 'ui.router', 'ngResource', 'ngFileUpload'])
  .constant('API_URL', 'https://devignapi.herokuapp.com/api')
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  })
  

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "views/users.html"
    })
    .state('about', {
      url: "/about",
      templateUrl: "views/about.html"
    })
    .state('user_show', {
      url: '/users/:id',
      templateUrl: 'views/user_show.html'
      // authenticate: true
    })
    .state('login', {
      data: {'requiresLogin': false},
      params: { 
        'toState': 'users', // default state to proceed to after login
        'toParams': {}
      },
      url: "/login",
      templateUrl: "views/login.html"
    })
    .state('signup', {
      data: {'requiresLogin': false},
      params: { 
        'toState': 'users', // default state to proceed to after login
        'toParams': {}
      },
      url: "/signup",
      templateUrl: "views/signup.html"
    })
    .state('add_idea', {
      data: {'requiresLogin': true},
      url: '/add_idea',
      templateUrl: 'views/add_idea.html'
    })
    .state('idea_show', {
      url: '/idea_show',
      templateUrl: 'views/idea_show.html'
    })
    .state('ideas', {
      url: '/ideas',
      templateUrl: 'views/idea_show.html'
    })

  $urlRouterProvider.otherwise("/");
}