Template.restoreButton.events({
  'click .restore-button': function() {
    var user = Meteor.user();
    var title = this.title;
    if(Roles.userIsInRole(user, ['admin', 'moderator'])) {
      Meteor.call("restoreBo", this._id, function(err, res) {
        if(!err) {
          Materialize.toast('Restored Build Order: ' + title, 4000);
        } else if(err){
          Materialize.toast(err.message);
        }
      });
    }
    return false;
  }
});
