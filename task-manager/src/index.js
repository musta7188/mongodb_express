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



// const jwt =  require('jsonwebtoken')
// const myFunction  = async () =>{

//   ////how we create a token and set the expire data
//   const token = jwt.sign({ _id: 'abc123'}, 'secretWord', {expiresIn: '7 second'})
//   console.log(token)

//   ///verify the data 
//  const data =  jwt.verify(token, 'secretWord')
//  console.log(data)
// //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1OTkyNDAxNzV9.iP_xuy5cxgYRf5sIZE_jqOPVRpBjx2QdJZOJ29fBOHQ
// }

// myFunction( )