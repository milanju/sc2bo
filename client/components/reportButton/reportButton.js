Template.reportButton.events({
  'click .report-button': function(event) {
    if(Meteor.user()) {
      var id = this._id;
      $('#report-' + id).openModal();
      setTimeout(function() {
        $('#report-reason-' + id).focus();
      }, 100);
    } else {
      $('#loginModal').openModal();
      setTimeout(function() {
        $('#login-username').focus();
      }, 100);
    }
  },
  'submit .report-form': function() {
    var boId = this._id;
    if($('#report-submit-' + boId).hasClass("disabled")) return;
    $('#report-submit-' + boId).addClass("disabled");
    var reason = $('#report-reason-' + boId)[0].value;
    Meteor.call("createReport", boId, reason);
    return false;
  }
});
