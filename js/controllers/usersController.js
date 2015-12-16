angular
  .module('devigner')
  .controller('usersController', UserController);

UserController.$inject = ['User', 'TokenService', '$location', '$rootScope', '$state', 'Upload', 'API_URL'];
function UserController(User, TokenService, $location, $rootScope, $state, Upload, API_URL) {
  var self = this;

  $rootScope.$on('$stateChangeSuccess', function() {
    if($state.params.id) {
      User.get({ id: $state.params.id }, function(data) {
        self.showUser = data.user;
      });
    }
  });

  self.all = [];
  self.user = {};
  // you've created an empty array to have a reference to the users ideas
  self.userIdeas = [];

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
    User.get({id:user._id}, function() {
      self.showUser = data.user;
      self.userIdeas = data.ideas;
    });

  }

  self.isLoggedIn = function() {
    // $location.path('/users');
    return !!TokenService.getToken();
  }

  self.uploadProfilePic = function() {
    Upload.upload({
      url: API_URL + '/upload/single',
      data: { file: self.file }
    })
    .then(function(res) {
      self.showUser.user_image = res.data.filename;
      User.update(self.showUser, function(res) {
        console.log(res);
      });
    });
  }

  if(self.isLoggedIn()) {
    self.getUsers();
    var user = TokenService.decodeToken();
    User.get({ id:user._id }, function(data) {
      self.showUser = data.user;
      // added userIdeas un the decodetoken function to include the users ideas
      self.userIdeas = data.ideas;
    });
    // $location.path('/users');
  };

  return self;
}




