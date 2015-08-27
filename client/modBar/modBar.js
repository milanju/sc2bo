Template.modBar.onCreated(function() {
  console.log("created!");
  var instance = this;
  instance.ready = new ReactiveVar();
  instance.autorun(function() {
    var sub1 = subs.subscribe('openReports');
    var sub2 = subs.subscribe('unsolvedBugs');
    var sub3 = subs.subscribe('unreadFeedback');
    instance.ready.set(sub1.ready() && sub2.ready() && sub3.ready());
  });
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
