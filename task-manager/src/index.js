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


const multer = require('multer')
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if(!file.originalname.match(/\.(doc|docx)$/)){
      return callback(new Error('Please upload a word file'))
    }

    callback(undefined, true)

  }
})


app.post('/upload', upload.single('upload'), (req, res) =>{
  res.send()

}, (error, req, res, next) => {
  res.status(400).send({error: error.message})

})
