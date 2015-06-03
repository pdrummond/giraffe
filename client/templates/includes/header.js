Template.header.events({
  "change #hide-archived input": function (event) {
    Session.set("hideArchived", event.target.checked);
  }
});

Template.header.helpers({
  hideArchived: function () {
    return Session.get("hideArchived");
  }
});
