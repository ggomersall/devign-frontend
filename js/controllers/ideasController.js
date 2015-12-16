angular
  .module('devigner')
  .controller('ideasController', IdeasController);

IdeasController.$inject = ['Idea', 'API_URL', 'Upload'];

function IdeasController(Idea, API_URL, Upload) {
  var self = this;

  self.all = [];
  self.idea = {};
  self.file = {};
  // this.newIdea = {};

  self.ideasIndex = function() {
    Idea.query(function(res) {
      self.all = res.ideas;
    });
  };

  self.ideaCreate = function(idea) {
    data = { 
        file: self.file,
        name: self.idea.name,
        description: self.idea.description
      }
    Upload.upload({
      url: API_URL + '/upload/single',
      data: data
    })
    .then(function(res) {
      console.log("Success!", res);
      // 
      // console.log(self.idea)
    })
    .catch(function(err) {
      console.log("Error!", err);
    });
    
  };


  self.ideaShow = function(idea) {
    console.log(idea)
    var data = Idea.get({id:idea._id}, function() {
      self.ideaShow = data.idea;
    });
    return data;
  }

  self.ideaDelete = function() {
    
  }

  return self;
}