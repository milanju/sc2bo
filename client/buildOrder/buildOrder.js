Template.buildOrder.helpers({
  buildOrder: function() {
    return BuildOrders.findOne({slug: FlowRouter.getParam('slug'), published: {$ne: "deleted"}});
  },
  replaysExist: function() {
    if(this.replays && this.replays.length > 0) return true;
    return false;
  },
  videosExist: function() {
    if(this.videos && this.videos.length > 0) return true;
    return false;
  },
  getYoutubeLink: function() {
    var link = this.link;
    var id = link.split("watch?v=")[1];
    return "//www.youtube.com/embed/" + id + "?rel=0;autohide=1";
  },
  steps: function() {
    var bo = this.bo;
    function compare(a,b) {
      if(a.position < b.position)
        return -1;
      if(a.position > b.position)
        return 1;
      return 0;
    }
    return bo.sort(compare);
  }
});
