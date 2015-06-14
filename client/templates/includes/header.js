Template.header.events({
  "change #hide-archived input": function (e) {
    Session.setPersistent("hideArchived", e.target.checked);
  }
});

Template.header.helpers({
  hideArchived: function () {
    return Session.get("hideArchived");
  }
});
