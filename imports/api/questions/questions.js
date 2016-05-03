import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Questions = new Mongo.Collection('Questions');

if (Meteor.isServer) {
  Meteor.publish('questions.approved', function approvedQuestionsPublication() {
    return Questions.find({ status: 'approved' });
  });

  Meteor.publish('questions.all', function allQuestionsPublication() {
    return Questions.find({});
  });

  Meteor.publish('question', function questionPublication(questionId) {
    return Questions.find(questionId);
  });
}

Meteor.methods({
  'questions.insert'({ title, content }) {
    check(title, String);
    check(content, String);

    // if (!this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Questions.insert({
      createdAt: new Date(),
      status: 'pending',
      userId: this.userId,
      title,
      content,
    });
  },

  'questions.remove'(questionId) {
    check(questionId, String);

    Questions.remove(questionId);
  },

  'questions.setStatus'(questionId, newStatus) {
    check(questionId, String);
    check(newStatus, String);

    // const task = Tasks.findOne(taskId);
    // if (task.private && task.owner !== this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Questions.update(questionId, { $set: { status: newStatus } });
  }
});
