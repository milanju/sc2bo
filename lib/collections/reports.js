Reports = new Mongo.Collection("reports");

ReportSchema = new SimpleSchema({
  boId: {
    type: String,
    max: 100
  },
  reason: {
    type: String,
    min: 10,
    max: 100
  },
  authorId: {
    type: String,
    max: 100
  },
  authorName: {
    type: String,
    max: 100
  },
  reporterId: {
    type: String,
    max: 100
  },
  reporterName: {
    type: String,
    max: 100
  },
  solved: {
    type: Boolean
  }
});

Reports.attachSchema(ReportSchema);

Meteor.methods({
  createReport: function(boId, reason) {
    console.log("CALLED");
    var user = Meteor.user();
    if(user) {
      var bo = BuildOrders.findOne({_id: boId});
      if(bo) {
        var authorId = bo.userId;
        var authorName = bo.author;
        var reporterId = user._id;
        var reporterName = user.username;
        var solved = false;
        Reports.insert({
          boId: boId,
          reason: reason,
          authorId: authorId,
          authorName: authorName,
          reporterId: reporterId,
          reporterName: reporterName,
          solved: solved
        }, function(err, res) {
          if(err) {
            if(Meteor.isClient) {
              Materialize.toast(err.message, 4000);
              $('#report-submit-' + boId).removeClass("disabled");
            }
          } else {
            $('#report-' + boId).closeModal();
          }
        });
      }
    }
  },
  deleteReport: function(reportId) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin', 'moderator'])) {
      Reports.remove({_id: reportId});
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },
  closeReport: function(reportId) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin', 'moderator'])) {
      Reports.update({_id: reportId}, {$set: {solved: true}});
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },
  closeReports: function(boId) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin', 'moderator'])) {
      Reports.update({boId: boId}, {$set: {solved: true}}, {multi: true});
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },
  openReport: function(reportId) {
    var user = Meteor.user();
    if(Roles.userIsInRole(user, ['admin', 'moderator'])) {
      Reports.update({_id: reportId}, {$set: {solved: false}});
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  }

});
