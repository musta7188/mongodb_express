const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const validator = require("validator")

///connect to the database
///URl for the database plus the name of the app
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true, // ensure that the index get created allowing us to access quickly the data we need to access
});

const User = mongoose.model("User", {
  name: {
    type: String,
    require: true ///validation this filed is required 
  },
  age: {
    type: Number,
    validate(value){
      if(value < 0){
        throw new Error('Age must be a positive Number')
      }
    }
  },
  email: {
    type: "string",
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("email not valid ")
      }
      
    }
  }
});

const User3 = new User({
  name: "Alexander",
  age: 32,
  email: "Mustafa@capodano.com"
});

User3.save()
.then((user) => {
  console.log(user);
})
.catch((error) => {
  console.log(error);
});