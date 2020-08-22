// CRUD create read update delete

///npm library we get back an object 
const mongodb = require("mongodb")


// initialize the connection it give us access to the function we need to connect the database 
const MongoClient = mongodb.MongoClient


//// choose the URL you want to connect to
////used ip of the localhost 127.0.0.1 / followed by the port 27017
const connectionURL = 'mongodb://127.0.0.1:27017'

///name of the data base that can be anything you want 
const databaseName = 'task-manager'

///connect method 
///function connect take the url and a callback function with error and client
////option object "{ useNewUrlParser: true}" to be parse correctly to be passed to the server 
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {

if(error){
 return console.log("enable to connect to the database")
}

///db method to get the connection for a specific database
////give back a db reference 
const db = client.db(databaseName)

///insert new data, with call back function 
// db.collection('users').insertOne({
//   name: "Mustafa",
//   age: 32
//     }, (error, result) => {
//       if(error) {
//         return console.log("unable to insert user")
//       }

//       console.log(result.ops)


//     })

db.collection('users').insertMany([
  {
    name: "jen",
    age: 28
  },
  {
    name: "Dan",
    age: 24
  }
], (error, result) => {

  if(error){
    return console.log('unable to insert the data')
  }

  console.log(result.insertedCount)
  console.log(result.ops)

})

 
})












/// run the mongodb server on the console
// cd ~ 
// pwd 
// Users/musta88
/// /Users/musta88/mongodb/bin/mongod --dbpath=/Users/musta88/mongodb-data