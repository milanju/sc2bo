Template.adminFeedback.helpers({
  unreadFeedback: function() {
    return Feedback.find({readBy: {$nin: [Meteor.userId()]}}, {sort: {createdAt: -1}});
  }
});
