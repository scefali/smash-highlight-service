const AWS = require('aws-sdk');
const _ = require('lodash');
const { promisify } = require('util');

const { awsConfig } = require('../config');

AWS.config.update(_.pick(awsConfig, ['accessKeyId', 'secretAccessKey', 'region']));
const s3 = new AWS.S3();
const createPresignedPost = promisify(s3.createPresignedPost).bind(s3);

const createPresignedHighlightPost = async fileName => {
  const filePath = fileName;
  console.log('filePath', filePath)
  const params = {
    Bucket: awsConfig.highlightBucket,
    Fields: {
      key: filePath
    },
    Expires: awsConfig.presignedExpire,
    Conditions: [
      ['acl', 'public-read'],
      ['content-length-range', 0, 10000000] // 10 Mb
    ]
  };
  return await createPresignedPost(params)
};


module.exports = {
  createPresignedHighlightPost
}