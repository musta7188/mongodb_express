    const express = require("express");

    ///will ensure that the index is connected to the db, so we do need to require anything specific
    require("./db/mongoos");

    const User = require("./models/user");
    const Task = require("./models/task");
const { ObjectID } = require("mongodb");

    const app = express();
    const port = process.env.PORT || 3000;

    ///transform the JSON data as an object to be able to access
    app.use(express.json());

    app.post("/users", (req, resp) => {
      const user = new User(req.body);

      user
        .save()
        .then(() => {
          resp.status(201).send(user);
        })
        .catch((error) => {
          resp.status(400).send(error);
        });
    });

    app.get('/users', (req, res) =>{
      User.find({}).then((users) =>{
        res.send(users)
      }).catch((e) =>{
        res.status(500).send()
      })
    })



    app.get('/users/:id', (req, res) =>{
      const _id = req.params.id

      User.findById(_id).then((user) =>{
        if(!user){
          return res.status(404).send()
        }

        res.status(200).send(user)

      }).catch((e) =>{
        res.status(500).send(e)
      })
    })







    app.post("/tasks", (req, resp) => {
      const task = new Task(req.body);

      task
        .save()
        .then(() => {
          resp.status(201).send(task);
        })
        .catch((error) => {
          resp.status(400).send(error);
        });
    });

    // app.delete('/users/:age', (req, resp) =>{

    //   User.remove({age: req.params.age === 0}, (error, resp) =>{
    //     if (error){
    //       return resp.send(error)
    //     }

    //     resp.send(resp)
    //   })

    //   })

    app.listen(port, () => {
      console.log("Server is up on port " + port);
    });
