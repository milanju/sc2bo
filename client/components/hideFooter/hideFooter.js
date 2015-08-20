Template.hideFooter.onRendered(function() {
  $('.footer').hide();
});

Template.hideFooter.onDestroyed(function() {
  $('.footer').fadeIn();
});
