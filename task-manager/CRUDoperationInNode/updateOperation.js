// CRUD create read update delete

const { MongoClient, ObjectID, ResumeToken } = require("mongodb");

//// choose the URL you want to connect to
////used ip of the localhost 127.0.0.1 / followed by the port 27017
const connectionURL = "mongodb://127.0.0.1:27017";

///name of the data base that can be anything you want
const databaseName = "task-manager";

///connect method
///function connect take the url and a callback function with error and client
////option object "{ useNewUrlParser: true}" to be parse correctly to be passed to the server
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("enable to connect to the database");
    }

    ///db method to get the connection for a specific database
    ////give back a db reference
    const db = client.db(databaseName);

    ///updateOne return a promises so no need of the callback function
    db.collection("users")
      .updateOne(
        {
          _id: ObjectID("5f4163330ab64741e5964ae3"),
        },
        {
          $set: { //change the name property
            name: "Gabe",
          },
          $inc: { ///increment the age value by 10
            age: +10
          }
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });



      db.collection('task').updateMany({completed: false}, {
        $set: {
          completed: true
        }
      }).then((result) => {
        console.log(result.modifiedCount())
      }).catch((error) => {
        console.log('task not updated')
      })
    
    
  })



