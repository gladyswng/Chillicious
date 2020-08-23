const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET


aws.config.update({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_SECRET,
  region: 'eu-central-1'
})
const s3 = new aws.S3();

const fileDelete = (fileURL) => {
  const fileName = fileURL.split('/')[3]
  const params = {
    Bucket: S3_BUCKET,
    Key: fileName
  }
    s3.deleteObject(params, function(err, data) {
      if (err) console.log(err, err.stack)  // error
      else console.log()   // deleted
    })


}


module.exports = fileDelete