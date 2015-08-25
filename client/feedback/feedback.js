Template.feedback.events({
  'submit #feedback-form': function() {
    if(!$('#feedback-submit-btn').hasClass('disabled')) {
      $('#feedback-submit-btn').addClass('disabled');
    }
    var content = $('#feedback-textarea')[0].value;
    Meteor.call('createFeedback', content, function(err, res) {
      if(!err) {
        Materialize.toast("Feedback submitted, thank you!", 4000);
        FlowRouter.go("/");
      } else {
        Materialize.toast(err.reason, 4000);
        $('#feedback-submit-btn').removeClass('disabled');
      }
    });
    return false;
  }
});
