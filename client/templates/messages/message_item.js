Template.messageItem.events({
  "click #archived-check": function () {
    Meteor.call('messageUpdateArchivedField', this._id, !this.archived, function(error, result) {
      if (error) {
        return alert(error.reason);
      }
    });
  },
});

Template.messageItem.helpers({
  isOwner: function() {
    return this.ownerId == Meteor.userId();
  }
});
