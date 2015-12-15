angular
  .module('devigner')
  .service("TokenService", TokenService);

TokenService.$inject = ["$window", "jwtHelper"];
function TokenService($window, jwtHelper){

  var self = this;

  self.saveToken = function(token) {
    return $window.localStorage.setItem('token', token);
  }

  self.getToken = function(){
    return $window.localStorage.getItem('token');
  }

  self.removeToken = function(){
    return $window.localStorage.removeItem('token');
  }

  self.decodeToken = function(){
    var token = self.getToken();
    return jwtHelper.decodeToken(token);
    // return token ? jwtHelper.decodeToken(token) : {};
  }

}