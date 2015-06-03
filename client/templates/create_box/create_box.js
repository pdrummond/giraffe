Template.createBox.events({
  'submit form': function(e) {
    e.preventDefault();

    var message = {
      content: $(e.target).find('[name=content]').val()
    };

    Meteor.call('messageInsert', message, function(error, result) {
      if (error) {
        return alert(error.reason);
      } else {
        $(e.target).find('[name=content]').val("");
      }
    });

  }
});
