

///this npm help you to upload file 
const multer  = require('multer');

///will create a folder with the destination name of 'images' to store the files
const upload = multer({
  dest: 'images'
})
              //// single return the middleware we need to use
              /// upload is the name of the key the method should look for
app.post('/upload', upload.single('upload'), (req, res) =>{
  res.send()
})
