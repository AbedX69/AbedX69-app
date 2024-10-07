const mongoose = require('mongoose');
const Counter = require('./Counter'); // Counter for generating userID

// Define the User Schema
const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true }, // userID is a number
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false } // isAdmin field for admin users
});

// Function to generate the next userID
async function getNextUserID() {
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'userID' },  // Use 'userID' as the identifier for the user counter
    { $inc: { seq: 1 } }, // Increment by 1
    { new: true, upsert: true } // Create the counter if it doesn't exist
  );
  return counter.seq;
}

// Static method to create a new user
userSchema.statics.createUser = async function (userData) {
  const existingUser = await this.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('Email already exists.');
  }
  userData.userID = await getNextUserID(); // Assign userID

  // Set isAdmin to true if the userID is 1000
  userData.isAdmin = userData.userID === 1000;

  const newUser = new this(userData);
  return await newUser.save();
};

module.exports = mongoose.model('User', userSchema);
