import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-west-2', // Update to your desired region
    accessKeyId: 'your-access-key-id', // Update with your actual access key
    secertAccessKey: 'your-secret-access-key' // Update with your actual access key and secret
});

export const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
