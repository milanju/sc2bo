Template.modReportedBoListed.onCreated(function() {
  var instance = this;
  var subscription = subs.subscribe('reportsForBo', this.data._id);
});

Template.modReportedBoListed.helpers({
  reports: function() {
    return Reports.find({boId: this._id, solved: false});
  },
  timesReported: function() {
    return Reports.find({boId: this._id, solved: false}).fetch().length;
  },
  solved: function() {
    if(Reports.findOne({boId: this._id, solved: false})) return false;
    return true;
  }
});

Template.modReportedBoListed.events({
  'click .reported-count': function() {
    var id = this._id;
    $('#listed-reports-' + id).slideToggle();
  },
  'click .close-reports': function() {
    Meteor.call('closeReports', this._id);
  }
});
