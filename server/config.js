const awsConfig = {
  accountId: process.env.AWS_ACCOUNT_ID,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-west-1',
  highlightBucket: 'smash-highlight-local',
  presignedExpire: 3600,
}

module.exports = { awsConfig }