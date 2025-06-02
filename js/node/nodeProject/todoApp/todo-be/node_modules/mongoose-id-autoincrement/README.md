# mongoose-id-autoincrement
Mongoose plugin that auto-increments any ID field on your schema every time a document is saved.

## Getting Started
> npm i mongoose-id-autoincrement

Install plugin and get reference to it, initialize it by passing in your mongoose connection and pass `autiIncrement.plugin` to the `plugin()` function on your schema.

> Note: You only need to initialize once.

````js
const mongoose = require('mongoose');
const autiIncrement = require('mongoose-id-autoincrement');

var db = mongoose.connect('mongodb://localhost:27017/mydb', { useMongoClient: true})

// Initialize autiIncrement by passing db connection
autiIncrement.initialize(db);

// User model schema
const userSchema = new mongoose.Schema({
  unique_id: Number,
  name: String,
  email: String
});

// Use autiIncrement plugin
userSchema.plugin(autiIncrement.plugin,  {model: 'user', field: 'unique_id', unique: false});
const User = mongoose.model('User', userSchema);

// Create a new user with auto-incrementing ID
let newUser = new User({
  name: 'John Doe',
  email: 'john.doe@example.com'
});

newUser.save((err, savedUser) => {
  if (err) {
    console.error(`Error saving user: ${err}`);
  } else {
    console.log(`New user saved with ID ${savedUser.id}`);
  }
});


````
