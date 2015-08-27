Template.modBar.onCreated(function() {
  subs.subscribe('openReports');
  subs.subscribe('unsolvedBugs');
  subs.subscribe('unreadFeedback');
});

Template.modBar.helpers({
  unreadFeedback: function() {
    return Feedback.find({readBy: {$nin: [Meteor.userId()]}}).fetch().length;
  },
  unsolvedBugs: function() {
    return Bugs.find({solved: false}).fetch().length;
  },
  openReports: function() {
    return Reports.find({solved: false}).fetch().length;
  },
  unreadFeedbackExist: function() {
    if(Feedback.find({readBy: {$nin: [Meteor.userId()]}}).fetch().length > 0) return true;
    return false;
  },
  unsolvedBugsExist: function() {
    if(Bugs.find({solved: false}).fetch().length > 0) return true;
    return false;
  },
  openReportsExist: function() {
    if(Reports.find({solved: false}).fetch().length > 0) return true;
    return false;
  }
});
