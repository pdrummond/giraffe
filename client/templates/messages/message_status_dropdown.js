Template.messageStatusDropdown.helpers({
  statusClass: function() {
    var statusClass;
    switch(this.status) {
      case 'Open': statusClass = ''; break;
      case 'In Progress': statusClass = 'green'; break;
      case 'Blocked': statusClass = 'red'; break;
      case 'In Test': statusClass = 'blue'; break;
      case 'Done': statusClass = ''; break;
    }
    return statusClass;
  }
});
Template.messageStatusDropdown.events({
  'click .item': function(ev) {
    var status = $(ev.target).text();
    Meteor.call('messageUpdateStatusField', this._id, status, function(error, result) {
      if (error) {
        return alert(error.reason);
      }
    });
  }
});
