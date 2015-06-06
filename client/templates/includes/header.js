Template.header.events({
  "change #hide-archived input": function (event) {
    Session.setPersistent("hideArchived", event.target.checked);
  }
});

Template.header.helpers({
  hideArchived: function () {
    return Session.get("hideArchived");
  }
});
