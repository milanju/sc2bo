Template.adminBugs.helpers({
  unsolvedBugs: function() {
    return Bugs.find({solved: false}, {sort: {createdAt: -1}});
  }
});
