const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const validator = require("validator")



const User = mongoose.model("User", {
  name: {
    type: String,
    require: true, ///validation this filed is required 
    trim: true /// avoid space in the name
  },
  age: {
    type: Number,
    default: 0, //default value 
    validate(value){
      if(value < 0){
        throw new Error('Age must be a positive Number')
      }
    }
  },
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("email not valid ")
      }
      
    }
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minLength: 6,
    validate(value){

      if(value.toLowerCase().includes('password')){
        throw new Error("password cannot be 'password'")
      } if(value.length < 6){
        throw new Error("password cannot be shorter then 6 digit")
      }
    }

  }
});


module.exports = User