angular
  .module('devigner')
  .controller('ideasController', IdeasController);

IdeasController.$inject = ['Idea'];

function IdeasController(Idea) {
  var self = this;

  self.all = [] ;
  self.idea = {};

  self.ideasIndex = function() {
    Idea.query(function(res) {
      self.all = res.ideas;
    });
  };

  self.ideaCreate = function() {
    Idea.ideaCreate(self.idea);
  };

  self.ideaShow = function(idea) {
    var data = Idea.get({id:idea._id}, function() {
      self.ideaShow = data.idea;
    });
  }

  self.ideaDelete = function() {
    
  }
}