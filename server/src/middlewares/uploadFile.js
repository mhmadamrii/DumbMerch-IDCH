// import package here
const multer = require('multer');

exports.uploadFile = (imageFile) => {
  
  // Destination and rename
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function(req, file, cb){
      cb(null, Date.now() + '-'+ file.originalname.replace(/\s/g,""));
    }
  })

  // Filter file type
  const fileFilter = function (req, file, cb){
    if(file.fieldname === imageFile){
      if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
        req.fileValidationError = {
          message: 'Only image files are allowed!'
        }

        return cb(new Error("Only image files are allowed!"), false)
      }
    }
    cb(null, true)
  }

  // Maximum File Size
  const size = 10;
  const maxSize = size * 1000 * 1000;
  const limits = {
    fileSize: maxSize
  }

  const upload = multer({
    storage,
    fileFilter,
    limits
  }).single(imageFile)



  return (req, res, next) => {
    upload(req, res, function (err) {

      // Filter
      if(req.fileValidationError){
        return res.send(req.fileValidationError)
      }
      
      // If file empty
      if(!req.file && !err){
        return res.send({
          message: 'Please select files to upload!'
        })
      }

      // Limit
      if(err){
        if(err.code == "LIMIT_FILE_SIZE"){
          return res.send({
            message: 'Max file sized 10Mb'
          })
        }
        return res.send(err)
      }

      return next();
    })
  }
};