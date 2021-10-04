# Week 4 : Storage, events and compute.

## Pre-requisites:

Last weeks homework <br>
This weeks preperation <br>

## Lesson Plan:

So far, we have focused on storage and compute in isolation. This week we combine the two through **events**. Many cloud services, serverless or not, emits unique events that can be listened and reacted upon. We will also go a bit more indepth with cloud infrastructure and security principles.

So far, we have seen the cron event, useful for scheduled jobs. But a lambda can be invoked in many different ways, depending on the use case (see [here](https://docs.aws.amazon.com/lambda/latest/dg/lambda-invocation.html) for more on lambda invocations).

**Examples on events that is serverless could be:**

- A scheduled event (i.e a cron event)
- A row is inserted/updated/deleted in a DynamoDB database.
- A lambda is triggered when something enters SQS (a AWS queue service).
- A file is uploaded/created/deleted from a bucket
- A SNS notification has been published (SNS is an AWS publish/subscription notification service).

... and alot more.

**Other examples of events:**

- a build pipeline gets triggered by a git commit
- an MySql server emits a write event
- a game server notifies that it is now full

... and alot more.

Our main focus is then to have a lambda - i.e serverless compute - and have it process these events to create additional functionality for our application.

### 1. Interfacing with storage

There is two storage events we would like to focus on: `New object created events` and `Object removal events`. Both will be applied in time to our application. To listen to these events, we will need to create a lambda once again with SAM.

Create a new lambda through the SAM cli init command. This time you want to use the app-template called `5 - Quick Start: S3`. This will generate a lambda, which is invoked when new objects is created in a specified bucket. Additionally, a folder is created with custom event files we can use for local development.

Remember to install the libraries with

`npm install`

Then we can run the lambda with

`sam local invoke --event events/event-s3.json`.

However, you will face an `access denied` error. This is because the event is pointing to an example **bucket** and **object** we do not have access to. By inspecting the code:

```javascript
exports.s3JsonLoggerHandler = async (event, context) => { // we now have an event payload!
  const getObjectRequests = event.Records.map((record) => {
    const params = {
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key,
    };

    ... // do something with the event
};
```

we see that is taking looking the records, specifically object and name values of our event.json file

```json
{
  "Records": [
    {
      ...,
      "s3": {
        "s3SchemaVersion": "1.0",
        "configurationId": "testConfigRule",
        "bucket": {
          "name": "example-bucket",  <---- change to own bucket name
          "ownerIdentity": {
            "principalId": "EXAMPLE"
          },
          "arn": "arn:aws:s3:::example-bucket"
        },
        "object": {
          "key": "test/key", <---- change to own object/filename
          "size": 1024,
          "eTag": "0123456789abcdef0123456789abcdef",
          "sequencer": "0A1B2C3D4E5F678901"
        }
      }
    }
  ]
}
```

For a complete list of S3 events see (here)[https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html])

### 2. Deploying the lambda

We will deploy this almost the same way as before, except we will need to specifiy a bucket in our deployment step - in this case the bucket to listen to, will be your own bucket `hyf-{your-credentials}-week-4-publisher`.

First, we can build with `sam build`. But by looking at the generated `buildspec.yml` we see that sam build is just a shortcut to the command for:

`aws cloudformation package --template template.yml --s3-bucket $S3_BUCKET --output-template template-export.yml`

This time however, we need to provide a parameter for a bucket we want our lambda to listen to. This is specificed in our cloudformation template:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
  S3 Events lambda

Parameters:
  AppBucketName:
    Type: String
    Description: "REQUIRED: Unique S3 bucket name to use for the app."

Resources:
  S3JsonLoggerFunction:
    Type: AWS::Serverless::Function
    Properties:
      ...
      Events:
        S3NewObjectEvent:
          Type: S3
          Properties:
            Bucket: !Ref AppBucket
            Events: s3:ObjectCreated:*

  AppBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref AppBucketName
```

Deploying this will create our usual lambda with an event configuration for new objects created. But it will also create a new bucket with the name we provide to it. This illustrates how to create multiple resources as part of our file. Clever! We will go more into depth with this in just a second.

### 3. Simple Notification Service (SNS)

Another way to trigger lambdas is to **subscribe** them to a notification. Each time a notification is **published**, the lambda is invoked. This can be achieved in node with the following code:

```
// code example taken from SO: https://stackoverflow.com/questions/31484868/can-you-publish-a-message-to-an-sns-topic-using-an-aws-lambda-function-backed-by

var AWS = require("aws-sdk");

exports.handler = function(event, context) {
    var eventText = JSON.stringify(event, null, 2);
    console.log("Received event:", eventText);
    var sns = new AWS.SNS();
    var params = {
        Message: eventText,
        Subject: "Test SNS From Lambda",
        TopicArn: "arn:aws:sns:us-west-2:123456789012:test-topic1"
    };
    sns.publish(params, context.done);
};

```

If you look at the Stack overflow post, you will notice the sentence: `You just need to make sure you give the IAM role executing the function access to publish to your topic`. This is a very important aspect of developing cloud infrastructure, where we strive for [Principle pf least privelege](https://en.wikipedia.org/wiki/Principle_of_least_privilege#:~:text=In%20information%20security%2C%20computer%20science,a%20user%2C%20or%20a%20program%2C).

In terms of the lambda above, this means two things:

1. We need to make sure we are allowed to throw the specific notification
2. We need to give our lambda access to throw notifications in general

These security permission and trust relationships between our AWS infrastructure can be specified in many ways (the UI, CLI, SDK and other ways). We will embrace the [infrastrcture as code](https://en.wikipedia.org/wiki/Infrastructure_as_code) principle, i.e we will specifiy it in our cloudformation template. Here is an example of template with a DyanmoDB policy:

```
AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31' b
Resources:
  MyFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      Handler: index.handler
      Runtime: nodejs8.10
      CodeUri: 's3://my-bucket/function.zip'
      Policies:
        AmazonDynamoDBFullAccess #Give DynamoDB Full Access to your Lambda Function
```

See more policy example [here](https://aws.amazon.com/premiumsupport/knowledge-center/lambda-sam-template-permissions/)

### 4. Class assignments

1. Create a stack with a lambda and bucket similar to the above and verify it runs, i.e trigger the lambda by uploading a file to S3. You can verify it runs by looking at the monitoring tab (although the visuals are usually delayed) or by looking at the cloudwatch logs.
2. Create a SNS in the UI. The topic name should be `hyf-{your-credentials}-sns-topic`. Make SNS publishing part of your lambdas application code.
3. Create a new lambda once again, but this time with the SNS template: `6 - Quick Start: SNS`. This new lambda should then be subscribed to your SNS. 
4. Delete your cloudformation stack.
