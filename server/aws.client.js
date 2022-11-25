const fs = require('fs');
require("dotenv").config()
const AWS = require('aws-sdk');


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
});



const uploadFile = (path, filename, type) => {

  try{
    const body = fs.readFileSync(path);
    const params = {
        Bucket: process.env.BUCKET, // pass your bucket name
        Key: filename, 
        Body: body,
        ACL:"public-read",                 
        ContentType: type 
    };
    
    return s3.upload(params).promise();

  } catch(err){
    throw err
  }
  
};

const getFileStream = (key) => {
  return s3.getObject({
    Bucket: process.env.BUCKET,
    Key: key,
  }).createReadStream()
}

const getSignedUrl = (key, exp) => {
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.BUCKET,
    Key: key,
    Expires: exp
  })
}

module.exports = {
    uploadFile,
    getSignedUrl,
    getFileStream
}