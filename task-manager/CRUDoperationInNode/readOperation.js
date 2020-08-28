// CRUD create read update delete



const {MongoClient, ObjectID, ResumeToken} = require('mongodb')




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

db.collection('users').findOne({_id: new ObjectID('5f41628947d3644171d514bf')}, (error, user) =>{
  if(error){
    return console.log('Unable to find the data')
  } 

  console.log(user)

})

///when using find you do not get a data object back but a courser which is point to the data type in the db
db.collection('users').find({age: 32 }).toArray((error, users) => {
  console.log(users)
})

db.collection('users').find({age: 32 }).count((error, count) => {
  console.log(count)
})

///find object by id 
db.collection('task').findOne({_id: ObjectID('5f4165cc42727c4290822036')}, (error, task) =>{

if(error){
  return console.log('impossibile to fetch this task')
}

console.log(task)

})
///find object by property
db.collection('task').find({completed: true}).toArray((error, count) => {
  if(error){
    return console.log(error)
  }

  console.log(count)

})


})









