Template.adminListedBugs.helpers({
  solved: function() {
    return this.solved;
  }
});

Template.adminListedBugs.events({
  'click .view-bug': function() {
    $('#bug-content-' + this._id).slideToggle();
  },
  'click .bug-mark-as-solved': function() {
    Meteor.call('closeBug', this._id, function(err, res) {
      if(err) {
        Materialize.toast(err.reason, 4000);
      } else {
        Materialize.toast("Marked Bug as solved", 4000);
      }
    });
  },
  'click .bug-mark-as-unsolved': function() {
    Meteor.call('openBug', this._id, function(err, res) {
      if(err) {
        Materialize.toast(err.reason, 4000);
      } else {
        Materialize.toast("Marked Bug as unsolved. :(", 4000);
      }
    });
  },
  'click .bug-delete': function() {
    Meteor.call('deleteBug', this._id, function(err, res) {
      if(err) {
        Materialize.toast(err.reason, 4000);
      } else {
        Materialize.toast("Deleted Bug", 4000);
      }
    });
  }
});
