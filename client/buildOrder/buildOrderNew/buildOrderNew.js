Template.buildOrderNew.onRendered(function() {
  $('select').material_select();
});

Template.buildOrderNew.events({
  'submit #new-bo-form': function(event) {
    var privacy = event.target.elements[0].value;
    var matchup = event.target.elements[1].value;
    var expansion = event.target.elements[2].value;
    var title = event.target.elements[3].value;
    BuildOrders.insert({
      privacy: privacy,
      matchup: matchup,
      expansion: expansion,
      title: title
    }, function(err, res) {
      if(res) {
        Meteor.call('getBoSlug', res, function(error, result) {
          if(result) {
            FlowRouter.go("/bo/" + result + "/edit");
          }
        });
      }
    });
    return false;
  }
});
