Template.bugs.events({
  'submit #report-bug-form': function() {
    if(!$('#report-bug-btn').hasClass('disabled')) {
      $('#report-bug-btn').addClass('disabled');
    }
    var content = $('#bugs-textarea')[0].value;
    Meteor.call('createBug', content, function(err, res) {
      if(!err) {
        Materialize.toast("Bug Report submitted, thank you!", 4000);
        FlowRouter.go("/");
      } else {
        Materialize.toast(err.reason, 4000);
        $('#report-bug-btn').removeClass('disabled');
      }
    });
    return false;
  }
});
