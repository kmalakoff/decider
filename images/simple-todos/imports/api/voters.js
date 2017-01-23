import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

const Voters = new Mongo.Collection('voters');
export default Voters;

if (Meteor.isServer) {
  Meteor.publish('voters.list', function() { return Voters.find({ owner: this.userId }); });
}

Meteor.methods({
  'voters.insert'(text) {
    check(text, String);

    if (!this.userId) throw new Meteor.Error('not-authorized');
    // throw new Meteor.Error('not-authorized');

    Voters.insert({
      created_at: new Date(),
      voter_id: 100,
      text,
      completed_count: 0,
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    });
  },
  'voters.remove'(task_id) {
    check(task_id, String);

    Voters.remove(task_id);
  },
  'voters.setChecked'(task_id, checked) {
    check(task_id, String);
    check(checked, Boolean);

    Voters.update(task_id, { $set: { checked } });
  },
});
