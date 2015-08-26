Template.adminListedFeedback.helpers({
  unread: function() {
    var readBy = this.readBy;
    var userId = Meteor.userId();

    for(var i = 0; i < readBy.length; i++) {
      if(readBy[i] === userId) return false;
    }

    return true;

  }
});

Template.adminListedFeedback.events({
  'click .view-feedback': function() {
    $('#feedback-content-' + this._id).slideToggle();
  },
  'click .feedback-mark-as-read': function() {
    Meteor.call('readFeedback', this._id, function(err, res) {
      if(err) {
        Materialize.toast(err.reason, 4000);
      } else {
        Materialize.toast("Marked Feedback as read", 4000);
      }
    });
  },
  'click .feedback-mark-as-unread': function() {
    Meteor.call('unreadFeedback', this._id, function(err, res) {
      if(err) {
        Materialize.toast(err.reason, 4000);
      } else {
        Materialize.toast("Marked Feedback as unread", 4000);
      }
    });
  },
  'click .feedback-delete': function() {
    Meteor.call('deleteFeedback', this._id, function(err, res) {
      if(err) {
        Materialize.toast(err.reason, 4000);
      } else {
        Materialize.toast("Deleted Feedback", 4000);
      }
    });
  }
});
