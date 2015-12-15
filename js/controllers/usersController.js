angular
  .module('devigner')
  .controller('usersController', UserController);

UserController.$inject = ['User', 'TokenService', '$location'];
function UserController(User, TokenService, $location) {
  var self = this;

  self.all = [];
  self.user = {};
  self.whatever = {};
  self.showUser = 'gareth'

  function handleLogin(res) {
    var token = res.token ? res.token : null;

    if(token) {
      self.getUsers();
      self.user = TokenService.decodeToken();
    }
    self.message = res.message;
  };

  self.login = function() {
    User.login(self.user, handleLogin);
    // this redirects a user to certain path after login
    $location.path('/users');

  };

  self.signup = function() {
    User.signup(self.user, handleLogin);
    $location.path('/users');
  };

  self.logout = function() {
    TokenService.removeToken();
    self.all = [];
    self.user = {};
  };

  self.getUsers = function() {
    User.query( function(res){
      self.all = res.users
    });
  };

  self.getUser = function(user) {
    var data = User.get({id:user._id}, function() {
      self.showUser = data.user;
    });
  }

  self.isLoggedIn = function() {
    // $location.path('/users');
    return !!TokenService.getToken();
  }

  if(self.isLoggedIn()) {

    self.getUsers();
    self.user = TokenService.decodeToken();
    // $location.path('/users');
  };

  return self;
}




