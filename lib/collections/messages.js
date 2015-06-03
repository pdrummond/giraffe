Messages = new Mongo.Collection('messages');

Meteor.methods({
  messageInsert: function(messageAttributes) {
    check(Meteor.userId(), String);
    check(messageAttributes, {
      content: String
    });
    var user = Meteor.user();
    var message = _.extend(messageAttributes, {
      ownerId: user._id,
      owner: user.username,
      createdBy: user.username,
      createdAt: new Date().getTime()
    });
    var messageId = Messages.insert(message);
    return {
      _id: messageId
    };
  },

  messageUpdateContent: function(messageId, messageAttributes) {
    check(Meteor.userId(), String);
    check(messageId, String);
    check(messageAttributes, {
      content: String
    });
    var existingMessage = Messages.findOne(messageId);
    if(Meteor.userId() !== existingMessage.ownerId) {
      throw new Meteor.Error(
        "not-authorised",
        "You do not have permission to update this message"
      );
    }
    var user = Meteor.user();
    var message = _.extend(messageAttributes, {
      updatedBy: user.username,
      updatedAt: new Date().getTime()
    });
    var messageId = Messages.update(messageId, message);
    return {
      _id: messageId
    };
  },

  messageUpdateArchivedField: function(messageId, archived) {
    check(Meteor.userId(), String);
    check(messageId, String);
    check(archived, Boolean);
    var existingMessage = Messages.findOne(messageId);
    if(Meteor.userId() !== existingMessage.ownerId) {
      throw new Meteor.Error(
        "not-authorised",
        "You do not have permission to archive/restore this message"
      );
    }
    var user = Meteor.user();
    var message = _.extend(existingMessage, {
      updatedBy: user.username,
      updatedAt: new Date().getTime(),
      archived: archived
    });
    var messageId = Messages.update(messageId, message);
    return {
      _id: messageId
    };
  },

  messageDelete: function(messageId) {
    check(messageId, String);
    var existingMessage = Messages.findOne(messageId);
    if(Meteor.userId() !== existingMessage.ownerId) {
      throw new Meteor.Error(
        "not-authorised",
        "You do not have permission to delete this message"
      );
    }
    Messages.remove(messageId);
  }
});
