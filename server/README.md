# Handling Upload File with Multer

In applications that mostly used like whatsapp and instagram, you can attach image or other file type right? But how server can handle request like this? The answer is we need middleware to handle file upload.  
In node js, we can use package called multer.  Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

For a simple example:
```javascript
const multer = require("multer")
// generate token when register or login
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})
 
const upload = multer({ storage: storage })
```

After create middleware, don't forget to create destination folder in your project

Reference: [Handling upload with multer](https://www.npmjs.com/package/multer)
