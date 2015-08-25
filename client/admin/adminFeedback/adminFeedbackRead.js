Template.adminFeedbackRead.helpers({
  readFeedback: function() {
    return Feedback.find({readBy: Meteor.userId()}, {sort: {createdAt: -1}});
  }
})
