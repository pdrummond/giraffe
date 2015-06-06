Template.messageStatusDropdown.helpers({
  statusClass: function() {
    var statusClass;
    switch(this.status) {
      case 'Open': statusClass = ''; break;
      case 'In Progress': statusClass = 'uk-button-success'; break;
      case 'Blocked': statusClass = 'uk-button-danger'; break;
      case 'In Test': statusClass = 'uk-button-primary'; break;
      case 'Done': statusClass = ''; break;
    }
    return statusClass;
  }
});
Template.messageStatusDropdown.events({
  'click li': function(ev) {
    var status = $(ev.target).text();
    Meteor.call('messageUpdateStatusField', this._id, status, function(error, result) {
      if (error) {
        return alert(error.reason);
      }
    });
  }
});
