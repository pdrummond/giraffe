Template.messagesList.helpers({
  messages: function() {
      console.log("boom");
    var jsonQuery = {};

    if(Session.get("channelId")) {
      jsonQuery.channelId = Session.get("channelId");
    }

    if (Session.get("hideArchived")) {
      jsonQuery.archived = {$ne: true};
    }
    var filterQuery = Session.get('filterQuery');
    if(filterQuery && filterQuery.length > 0) {
        jsonQuery = QueryBuilder.buildFilterQueryJson(filterQuery, jsonQuery);
    }
    console.log("jsonQuery: " + JSON.stringify(jsonQuery));
    return Messages.find(jsonQuery);
  }
});

Template.messagesList.onRendered(function() {
  window.scrollTo(0,document.body.scrollHeight);
});
