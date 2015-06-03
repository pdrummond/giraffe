Template.messagesList.helpers({
  messages: function() {
    if (Session.get("hideArchived")) {
      return Messages.find({archived: {$ne: true} });
    } else {
      return Messages.find();
    }
  }
});
