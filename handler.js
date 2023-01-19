'use strict';

const AWS = require('aws-sdk'); //we want to use the aws-sdk
var sqs = new AWS.SQS({ region: 'us-east-1'});

const AWS_ACCOUNT = process.env.ACCOUNT_ID;
const QUEUE_URL = `https://sqs.us-east-1.amazonaws.com/${AWS_ACCOUNT}/MyQueue`;

module.exports.hello = async (event, context, callback) => {

  const params = {
    MessageBody: 'Hola',
    QueueURL: QUEUE_URL
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log('error:', 'Fail Send Message' + err);

      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'ERROR'
        })
      };

      callback(null, response);
    }else {
      console.log('data:', data.MessageID);

      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: data.MessageId
        })
    };
    callback(null, response);
  }
  
});

};

module.exports.sqsHello = (event, context, callback) => {
  console.log('it was called');

  console.log(event);
  
  context.done(null, '');
};