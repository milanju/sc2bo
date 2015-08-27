Template.modReports.helpers({
  /*reports: function() {
    return Reports.find({solved: false});
  },*/
  buildOrders: function() {
    var reports = Reports.find({solved: false}).fetch();
    var boIds = [];
    for(var i = 0; i < reports.length; i++) {
      boIds.push(reports[i].boId);
    }
    return BuildOrders.find({_id: {$in: boIds}});
  }
});
