Template.loading.onRendered(function() {
  $('.spinner').fadeIn("fast");
});

Template.loading.onDestroyed(function() {
  $('.spinner').fadeOut("fast");
});
