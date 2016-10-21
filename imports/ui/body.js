import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Posts } from '../api/posts.js';

import './post.js';
import './body.html';


Template.body.helpers({
  posts() {
    return Posts.find({}, { sort: { updatedAt: -1 } });
  },
});

Template.body.events({
  'submit .new-post'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    Meteor.call('posts.insert', text);
    // Clear form
    target.text.value = '';
  },

});
