
//This is a work in progress - not being used right now.


Counters = new Mongo.Collection('counters');

Meteor.startup(function() {
    if(Counters.findOne("messages") == null) {
        console.log("Creating messages counter");
        Counters.insert({
              _id: "messages",
              seq: 0
           }
       );
   }
});

//Need to figure out how to acheive findAndModify in Meteor to progress this.
function getNextCounter(name) {
   var ret = Counters.findAndModify({
       query: { _id: name },
       update: { $inc: { seq: 1 } },
       new: true
   });

   return ret.seq;
}
