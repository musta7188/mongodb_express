const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require('bcrypt')
/// we will costumize the schema before passed to the user
const userSchema = new mongoose.Schema({
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
})



///.pre allow us to do something before the user schema
///// first is to save and second is the function to run, (we can just use a normal function not a arrow function)
userSchema.pre('save', async function(next) {
  ///this give us access to the current object or current user that is about to be saved
  const user = this 

  ///check if the password has been changed or modified 
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }



  ///next tell the function that we done with our task and that the program can go ahead
  next()

})




///the second argument the object get converted into a schema 
////for the user password security authentication we need to create the schema first and then pass that in
const User = mongoose.model('User', userSchema)
module.exports = User