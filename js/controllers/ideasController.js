angular
  .module('devigner')
  .controller('ideasController', IdeasController);

IdeasController.$inject = ['Idea', 'API_URL', 'Upload'];

function IdeasController(Idea, API_URL, Upload) {
  var self = this;

  self.all = [];
  self.idea = {};
  self.file = {};
  this.newIdea = {};

  self.ideasIndex = function() {
    Idea.query(function(res) {
      self.all = res.ideas;
    });
  };

  self.ideaCreate = function() {

    Upload.upload({
      url: API_URL + '/upload/single',
      data: { file: self.newIdea.file }
    })
    .then(function(res) {
      console.log("Success!", res);
    })
    .catch(function(err) {
      console.log("Error!", err);
    });

    // Idea.ideaCreate(self.idea);
    // self.image = res.file
  };

  self.ideaShow = function(idea) {
    var data = Idea.get({id:idea._id}, function() {
      self.ideaShow = data.idea;
    });
  }

  self.ideaDelete = function() {
    
  }

  // return self;
}