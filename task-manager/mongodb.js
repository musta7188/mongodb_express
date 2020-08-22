// CRUD create read update delete

///npm library we get back an object 
const mongodb = require("mongodb")


// initialize the connection it give us access to the function we need to connect the database 
const MongoClient = mongodb.MongoClient

////used ip of the localhost 127.0.0.1
const connectionURL = 'mongodb://127.0.0.1:27017'

const databaseName = 'task-manager'

///connect method 
///function that connect take the url and a callback function with error and client
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {

if(error){
 return console.log("enable to connect to the database")
}

///db method to get the connection for a specific database
const db = client.db(databaseName)

///insert new data 
db.collection('users').insertOne({
  name: "Mustafa",
  age: 32
    })
 
})


/// run the mongodb server on the console
// cd ~ 
// pwd 
// Users/musta88
/// Users/musta88/mongodb/bin/mongod --dbpath=/Users/musta88/mongodb-data