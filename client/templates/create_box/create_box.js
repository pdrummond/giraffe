Template.createBox.events({
  "keydown #create-box-input": function(ev) {
    if(ev.keyCode == 13 && ev.shiftKey == false) {
      ev.preventDefault();
      var content = $('#create-box-input').val();
      if(content.length > 0) {
        var message = {
          content: content
        };

        Meteor.call('messageInsert', message, function(error, result) {
          if (error) {
            return alert(error.reason);
          } else {
            window.scrollTo(0,document.body.scrollHeight);
            $('#create-box-input').val("");
          }
        });
      }
    }
  }
});
