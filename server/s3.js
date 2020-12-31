const AWS = require("aws-sdk")
require("dotenv").config()
const {AWS_ACCESS_KEY_ID, AWS_SECTRET_ACCESS_KEY} = process.env

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECTRET_ACCESS_KEY,
    region: 'us-east-2'
})

const BUCKET_NAME = "photopress"

const s3Bucket = new AWS.S3({params: {Bucket: BUCKET_NAME}})

const imageUpload = (path, buffer, encoding, type) => {
    const data = {
        Key: path,
        Body: buffer,
        ContentEncoding: encoding,
        ContentType: type,
        ACL: 'public-read'
    }

    return new Promise((res, rej) => {
        s3Bucket.putObject(data, (err) => {
            if(err){
                rej(err)
            } else{
                res(`https://s3.amazonaws.com/${BUCKET_NAME}/${path}`)
            }
        })
    })
}

module.exports = imageUpload