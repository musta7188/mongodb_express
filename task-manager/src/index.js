const express = require("express");

///will ensure that the index is connected to the db, so we do need to require anything specific
require("./db/mongoos");

const UserRouter = require('./Routers/user')
const TaskRouter = require('../src/Routers/task')

const app = express();

const port = process.env.PORT || 3000;

///transform the JSON data as an object to be able to access
app.use(express.json());
app.use(UserRouter)
app.use(TaskRouter)


app.listen(port, () => {
  console.log("Server is up on port " + port);
});


// const bcrypt = require('bcrypt')

// const myFunction  = async () =>{

//   const password = 'Mustaa7188'

//   /// hash method takes the password and the number of times need to run the logic to hash the string 8 is the perfect number 
//   const hashedPassword = await bcrypt.hash(password, 8)

//   console.log(password)
//   console.log(hashedPassword)

//   //////returns a boolean if the password match or not
//   const isMatch = await bcrypt.compare('Mstaa7188', hashedPassword)
//   console.log(isMatch)

// }

// myFunction()