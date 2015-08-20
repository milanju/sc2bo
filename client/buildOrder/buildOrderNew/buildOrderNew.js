Template.buildOrderNew.onRendered(function() {
  $('select').material_select();
});

Template.buildOrderNew.events({
  'submit #new-bo-form': function(event) {
    if($('#new-bo-btn').hasClass('disabled')) return false;
    $('#new-bo-btn').addClass('disabled');
    $('.new-bo-preloader').show();
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
      } else {
        Materialize.toast(err.message, 4000);
        $('#new-bo-btn').removeClass('disabled');
        $('.new-bo-preloader').hide();
      }
    });
    return false;
  }
});
