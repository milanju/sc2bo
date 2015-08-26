Template.adminBugsSolved.helpers({
  solvedBugs: function() {
    return Bugs.find({solved: true});
  }
});
