import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

Meteor.methods({
  'posts.insert'(text) {
    check(text, String);

    Posts.insert({
      text,
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: this.userId,
      username: Meteor.user().emails[0].address,
    });
  },
  'posts.remove'(postId) {
    check(postId, String);

    Posts.remove(postId);
  },
  'posts.update'(postId, text) {
    check(postId, String);
    check(text, String);

    Posts.update(postId, { $set: { text: text, updatedAt: new Date()} });

  },
});
