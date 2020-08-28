const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

///connect to the database
///URl for the database plus the name of the app
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true, // ensure that the index get created allowing us to access quickly the data we need to access
});

///how to create the schema and models collection for the models
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

///created the model
const Tasks = mongoose.model('Tasks', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

////created the instance of the model with the filed/schema of the database
const task1 = new Tasks({
  description: "take out the dog",
  completed: false
})

const task2 = new Tasks({
  description: "take the trash out",
  completed: true
})

///array to push all the tasks
const arrayOfTasks = []

arrayOfTasks.push(task1, task2)

///instead of save() method used the insertMany for multiple task to save
Tasks.insertMany(arrayOfTasks).then((response) => {
  console.log(response)
}).catch((error) => {
console.log(error)
})


// ///instant of the object
// const Mustafa = new User({
//   name: "Mustafa",
//   age: 32,
// });

// //save method which return a promisses
// Mustafa.save()
//   .then((user) => {
//     console.log(Mustafa);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// ///delete method by id
// User.remove({ _id: ObjectID("5f49257773f7000b5f3ce51f") }, (error, resp) => {
//   if (error) {
//     console.log("faild to delte");
//   } else {
//     console.log(resp);
//   }
// });
