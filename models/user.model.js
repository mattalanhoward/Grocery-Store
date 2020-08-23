const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      //trim removes white space.
      trim: true,
      required: [true, "First Name is required"]
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last Name is required"]
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true
    },
    passwordHash:{
      type: String,
      required: [true, "Password is required"]
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Address is required"]
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: [true, "Phone Number is required"]
    },
    isAdmin: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);
