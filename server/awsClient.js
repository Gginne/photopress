const fs = require('fs');
require("dotenv").config()
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});



const uploadFile = (path, filename) => {

  try{
    const body = fs.readFileSync(path);
    const params = {
        Bucket: process.env.BUCKET, // pass your bucket name
        Key: filename, // file will be saved as testBucket/contacts.csv
        Body: body
    };

    s3.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err
        console.log(`File uploaded successfully at ${data.Location}`)
    });

  } catch(err){
    throw err
  }
  
};

module.exports = {
    uploadFile
}