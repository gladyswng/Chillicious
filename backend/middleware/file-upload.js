const multer = require('multer')
let fs = require('fs-extra');
const { v1: uuid_v1 } = require('uuid')

const multerS3 = require('multer-s3')
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET


aws.config.update({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_SECRET,
  region: 'eu-central-1'
})

const s3 = new aws.S3()




const MIME_TYPE_MAP = {
   'image/png': 'png',
   'image/jpeg': 'jpeg',
   'image/jpg': 'jpg'
}


const fileUpload = multer({
  limits: 500000,

  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    // metadata: function (req, file, cb) {
    //   cb(null, {fieldName: file.fieldname});
    // },
    key: (req, file, cb) => {
      // To extract the extension 
      const ext = MIME_TYPE_MAP[file.mimetype]
      // generate a random file with the right extension
      cb(null, uuid_v1() + '.' + ext)
    }
  }),

  // storage: multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     let path = 'uploads/images'

  //     cb(null, path)
  //   },
  //   filename: (req, file, cb) => {
  //     console.log(file)
  //     // To extract the extension 
      
  //     const ext = MIME_TYPE_MAP[file.mimetype]
  //     // generate a random file with the right extension
  //     cb(null, uuid_v1() + '.' + ext)
  //   }
  // }),
  fileFilter: (req, file, cb) => {
    // Check if can find mimetype here
    // !! - convert undefined, null to false - either true or false
    const isValid = !!MIME_TYPE_MAP[file.mimetype] 
    let error = isValid ? null : new Error('Invalid file type')
    cb(error, isValid)
  }
})

module.exports = fileUpload 