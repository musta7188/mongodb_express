const express = require("express");

///will ensure that the index is connected to the db, so we do need to require anything specific
require("./db/mongoos");

const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

///transform the JSON data as an object to be able to access
app.use(express.json());

// app.post("/users", (req, resp) => {
//   const user = new User(req.body);

//   user
//     .save()
//     .then(() => {
//       resp.status(201).send(user);
//     })
//     .catch((error) => {
//       resp.status(400).send(error);
//     });
// });

/// recreate the above function in a sync way

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    //anything after this will wait until the user is saved
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }

  //anything after this will wait until the user is saved
});

app.get("/users", async (req, res) => {

  try {
      const users = await User.find({})
      res.status(202).send(users)
  } catch (e) {
    res.status(500).send(e)
  }
  
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id

  try {
    const user = User.findById({_id})

    if(!user){
      return res.status(404).send("user not found try a different id")
    }
    res.send(user)
  } catch (e) {
    res.status(500).send(e)
  }
  
});


app.patch('/users/:id', async (req, resp) =>{
      
  // console.log(req.body)
  try {
                                                 /// new :true : this will return the new user with the updates
                                              ////runValidators: true : make sure we use validator to get the format we accepted
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new :true, runValidators: true})

    if(!user) {
      return resp.status(404).send()
    }
    
    resp.send(user)

  } catch(e) {

    resp.status(400).send(e)
  }

})





app.get("/tasks", async (req, resp) => {


 try {
      const tasks = await Task.find({})
      resp.status(201).send(tasks)

 } catch (e) {
    resp.status(500).send(e)
 }
});

app.get("/tasks/:id", async (req, resp) => {
  const _id = req.params.id;

  try {
  const task = await Task.findById(_id)
    if(!task){
      return resp.status(404).send("task not found")
    }

    resp.status(201).send(task)


  } catch (e) {
      resp.status(500).send(e)
  }


});

app.post("/tasks", async (req, resp) => {

  const task = new Task(req.body)

  try {

      await task.save(task)
       resp.status(201).send(task)
  } catch(e) {
    resp.status(500).send(e)
  }

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
