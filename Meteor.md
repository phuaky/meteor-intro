### What is Meteor

Meteor is a robust and full-stack JavaScript platform for developing real-time web and mobile applications. It makes it easier to create real time apps since Meteor alone offers full ecosystem to work with instead of combining couple of different tools and framework to get the same effect.
### Meteor Features
* **Web and Mobile** − Meteor offers platform for developing Web, Android and IOS apps.
* **Universal Apps** − The same code for web browsers and mobile devices.
* **Packages** − Huge number of packages easy to install and use.
* **Full-stack Solutions** - bundled with several built-in features, such as reactive templates, automatic CSS and JS minification on the production server and hot code reload.
* **Cloud platform** - It uses Galaxy and it is quite powerful for deploying, scaling and monitoring client applications.

### Meteor Advantages

* Developers only need JavaScript for server and client side development.
* The coding is very simple and beginner friendly.
* Meteor apps are real time by default.
* Save a lot of time with smart packages

### Meteor Limitations

* Meteor isn't very suitable for large and complex application.
* There is a lot of magic going on when working with Meteor so developers might find themselves limited in some way.
* It currently only supports MongoDB database so you cannot use Meteor if you need to include NoSQL database support for your applications.

### Prerequisites
Meteor is JavaScript framework so you need to have basic knowledge of JavaScript and HTML. You will also need to be familiar with NodeJS and MongoDB, although you will be able to understand everything without previous knowledge. If you never used mongoDB, any knowledge about databases should suffice. Since Meteor is full-stack framework, any previous experience in creating web or mobile apps will be helpful.

### Sites built with meteor 
- partner.microsoft.com
- codefights.com --> Codewars, Codility clone
- rocket.chat --> Chat app (edited)

## SETUP ##

1. Download Meteor
type in terminal: 
~~~
curl https://install.meteor.com/ | sh
~~~

2. Create a meteor app (here titled medium-blog)
~~~
meteor create medium-blog
~~~

3. Run the app  
~~~
cd medium-blog
meteor npm install
meteor
~~~

After running meteor, localhost:3000// will be running automatically  

## PACKAGES

Copy and paste the following into .meteor/packages 
~~~
raix:handlebar-helpers          		# allows us to accept the session in $
aldeed:collection2              		# needed for autoform
aldeed:autoform                 		# automatically create a form for a collection
accounts-ui                     		# signin dialog
accounts-password               		# signin with password
gwendall:auth-client-callbacks  	# enables redirects after login
check                           		# for validating inputs
meteortoys:allthings            		# enables us some mongo view tools
fortawesome:fontawesome         	# icons
~~~


## File Structure
copy the following commands to your CLI
~~~
mkdir imports api imports/UI
cd api
touch posts.js
cd ../imports
touch body.html body.js post.html post.js UI/body.js
~~~

Remove unnecessary stuff that comes default
In client/main.html
Remove everything except for the header
In client/main.js
Remove all the codes


api > posts.js
~~~javascript
import { Mongo } from 'meteor/mongo';
export const Posts = new Mongo.Collection('posts');
~~~

## Create form 
body.html
~~~html
<body>
<form class="new-post">
       <input type="text" name="text" placeholder="Type to add new tasks" />
<button type="submit">Publish</button>
     </form>
</body>
~~~

## Submit to database
body.js
~~~javascript
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Posts } from '../api/posts.js';
import './body.html'

Template.body.events({
  'submit .new-post'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    
    // Insert a task into the collection
    Posts.insert({
      text,
      createdAt: new Date(), // current time
      updatedAt: new Date(), // current time
    });

    // Clear form
    target.text.value = ‘';
  }, 
});
~~~

server > main.js
~~~javascript
import '../imports/api/posts.js';
~~~


Read and append to page the submitted data to after the form but within the body  

body.html
~~~html
  <ul>
  	{{#each posts}}
  	<li>{{> post}}</li>
  	{{/each}}
  </ul>
~~~

body.js
~~~
Template.body.helpers({
  posts() {
    return Posts.find({}, { sort: { updatedAt: -1 } });
  },
});
~~~

## Delete

imports/ui/post.html
~~~html
<template name="post">
  <span class="text">{{text}}</span>
  <button class="delete">Delete this</button>
</template>
~~~~

post/js
~~~post.js
import { Template } from 'meteor/templating';
import { Posts } from '../api/posts.js';

import './post.html';

Template.post.events({
	'click .delete'() {
 	Posts.remove(this._id);
   },
})
~~~~

body.js
~~~javascript
import './post.js'
~~~

# AUTHENTICATION

imports/ui/body.html
~~~html
     {{> loginButtons}}
~~~

Create file imports/startup/accounts-config.js
~~~
import { Accounts } from 'meteor/accounts-base';
Accounts.ui.config({
passwordSignupFields: 'USERNAME_ONLY',
});
~~~

client/main.js, add:
~~~javascript
import '../imports/startup/accounts-config.js';
~~~

To show which user created each task

In imports/ui/body.js, 
Add at the top: import { Meteor } from 'meteor/meteor';
Within 	Posts.insert({:
		     owner: Meteor.userId(),
     username: Meteor.user().username,


In imports/ui/post.html, 
	Replace   <span class="text">{{text}}</span>
	With	<span class="text"><strong>{{username}}</strong> - {{text}}</span>





An explanation of the various meteor folders and what they do
imports/
 startup/
   client/
     index.js                 # import client startup through a single index entry point
     routes.js                # set up all routes in the app
     useraccounts-configuration.js # configure login templates
   server/
     fixtures.js              # fill the DB with example data on startup
     index.js                 # import server startup through a single index entry point

 api/
   lists/                     # a unit of domain logic
     server/
       publications.js        # all list-related publications
       publications.tests.js  # tests for the list publications
     lists.js                 # definition of the Lists collection
     lists.tests.js           # tests for the behavior of that collection
     methods.js               # methods related to lists
     methods.tests.js         # tests for those methods

 ui/
   components/                # all reusable components in the application
                              # can be split by domain if there are many
   layouts/                   # wrapper components for behaviour and visuals
   pages/                     # entry points for rendering used by the router

client/
 main.js                      # client entry point, imports all client code

server/
 main.js                      # server entry point, imports all server code





Talk about meteortoys - what it does, how to get it



//hot code push. pages automatically update new content without refreshing - may take some time though
//related to that, database changes are updated without refresh (e.g., additions to todo list)
//var versus let versus const

//reactive-dict (to store temporary reactive state on the client. A ReactiveDict is like a normal JS object with keys and values, but with built-in reactivity.)
//meteor add accounts-ui accounts-password (to use meteor's inbuilt user authentication)
//meteor remove insecure (by default meteor is in insecure mode where users can make edits to database from client side. When launching the product, needs to remove this option)
//IMPORTANT. Meteor has multiple files with the same name in different folders. Need to be mindful of actual file being worked on
	
	MongoDB - to monitor Mongo
meteortoys:allthings            # enables us some mongo view tools
mongoDB compass - app like psequel



NOTES
//NOTES BELOW
- Start up for meteor seems to be quite slow
- Installing took a while
- Creating a new meteor project takes longer than Rails or Node (as in processing time after entering instructions)
- Tried following the tutorial but could not find folder import so I created files and folders
- Import folder needs to be called by calling import - much like require
- Similar to partials, Meteor has templates that can be called e.g., {{> hello}} (calls the template hello).
- Templates can be defined elsewhere and called
- In javascript, templates can be called with Template.templateName.
- The <body> is a special template and can be called in js with Template.body






NOT INCLUDED IN GITBOOK


QUESTIONS
//QUESTIONS
-does order of code matter? Not for templates and defining of templates
- By default, Meteor uses MongoDB - yes. 
- What is a collection? - it is the mongo equivalent of a sql table
- What is Spacebars statement? - it is the special syntax that converts meteor script into html (think erb, ejs syntax)


TO DO (in future)
- Investigate accounts-facebook for facebook authentication
- What is optimistic UI? Investigate optimistic UI (https://www.meteor.com/tutorials/blaze/security-with-methods)


Presentation Timeline 
1.30pm - 1.35pm: 






