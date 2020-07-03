const multer = require('multer')
let fs = require('fs-extra');
const { v1: uuid_v1 } = require('uuid')
const MIME_TYPE_MAP = {
   'image/png': 'png',
   'image/jpeg': 'jpeg',
   'image/jpg': 'jpg'
}


const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let path = 'backend/uploads/images'

      cb(null, path)
    },
    filename: (req, file, cb) => {
      console.log(file)
      // To extract the extension 
      
      const ext = MIME_TYPE_MAP[file.mimetype]
      // generate a random file with the right extension
      cb(null, uuid_v1() + '.' + ext)
    }
  }),
  fileFilter: (req, file, cb) => {
    console.log(file)
    // Check if can find mimetype here
    // !! - convert undefined, null to false - either true or false
    const isValid = !!MIME_TYPE_MAP[file.mimetype] 
    let error = isValid ? null : new Error('Invalid file type')
    cb(error, isValid)
  }
})

module.exports = fileUpload 