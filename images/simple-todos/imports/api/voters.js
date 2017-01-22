import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
 
export const Voters = new Mongo.Collection('voters', {idGeneration: 'MONGO'});

if (Meteor.isServer) {
  // Meteor.publish('voters', () => { console.log('publishing'); return Voters.find(); });
}
else {
  Meteor.subscribe('voters', () => { console.log(Voters.find().fetch()); });
}
