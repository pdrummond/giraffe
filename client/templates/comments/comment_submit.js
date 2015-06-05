Template.commentSubmit.onCreated(function() {
  Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
        messageType: "commentMessage",
      content: $body.val(),
      parentMessageId: template.data._id,
      parentMessageGid: template.data.gid,
    };

    var errors = {};
    if (! comment.content) {
      errors.body = "Please write some content";
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('messageInsert', comment, function(error, messageId) {
      if (error){
        alert(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});
