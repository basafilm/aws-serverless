# Week 3: Compute

## Pre-requisites:

- Last weeks assignments
- This weeks preperation

## Lesson Plan:

### 1. Compute and serverless?

Serverless compute/computation is the layer that is strictly focusing to executing a given piece of code, using the CPU's. There is no storage , memory or disk layer which can be utilized - other services like S3 would have to be used for that.

Theese restrictions makes a very powerful and simple interface for us to create solutions with, in a wide range of varieties. In the serverless context, we have infinite scalability and fast compute power on top of a great pricing model.

### 2. Lambdas & functions

Lambdas and functions is the cornerstone of serverless compute. Please note that lambdas and functions are the same, they just have different names in our cloud providers.

You can think of a function/lambda as a cloud function, running a given codebase on a given programming environment.

Cloud functions are small codebases recieving an incoming event/request and outputting a response. They can be used for creating an API, queues, time based jobs, stream handling and custom event handling for other services such as S3. Since we are working on AWS, we will refer to cloud functions as **lambdas** from here on and onwards.

### 3. Cron/Timebased functions

Our first journey will be going into [cron](https://en.wikipedia.org/wiki/Cron) based lambdas on AWS. We will use [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) to run and develop on them locally, and deploy it on AWS to run the code on a daily bases.

The SAM CLI has alot of utility, for all of Lambdas usecases (api, queue, custom events and more), but we will start out simple by creating CRON based tasks.

After SAM has been installed, we will initiate a new project with:

`sam init`

These are the arguments you need to provide:

1. Chose `AWS Quick Start Templates` as template source,
2. Choose `Zip` as package type.
3. Choose `nodejs14.x` as runtime.
4. Type 'hyf'-{your-credentials}-cron-lambda' as the name, e.g `hyf-pds-cron-lambda`.
5. Choose `Quick Start: Scheduled Events` as an app template.

This will create a node boilerplate that we can run with sam by running:

`sam local invoke ScheduledEventLogger`.

### 4. Deploying lambdas with SAM to AWS

To deploy a lambda to AWS through SAM, we will need to create what is called a (cloudformation stack)[https://aws.amazon.com/cloudformation/]. Think of stacks as a recipe of cloud resources and their configuration for a given IT solution/system/environment.

First, we build the lambda running `sam build`. Next we can run `sam deploy --guided`. The arguments will need to be as follows:

1. Type 'hyf'-{your-credentials}-cron-lambda' as the stack name, e.g `hyf-pds-cron-lambda`.
2. Choose default region (us-east-1)
3. Confirm IAM role creation

Your lambda is now deployed and you can find it inside both the cloudformation and lambda UI on the AWS console.

### 5. Cloudwatch

This week, we will also begin to use the service called [cloudwatch](https://aws.amazon.com/cloudwatch/features/). Cloudwatch is flexible monitoring tool, which provides out of the box monitoring of key metrics for all of our infrastructure hosted on AWS. There is alot of utility in cloudwatch, but we will start off slowly by integrating it into our lambda.

First off, to use it inside our lambda, we need to install the cloudwatch sdk to our lambda by running `npm install @aws-sdk/client-cloudwatch`.

The general aws-sdk signature is usually done with three following steps:

1. define a client
2. define parameters/payload.
3. call the relevant command with the payload through the client.

For Cloudwatch this looks like the following.

```
const { CloudWatchClient } = require("@aws-sdk/client-cloudwatch");
const { ListMetricsCommand } = require("@aws-sdk/client-cloudwatch");

const cloudwatchClient = new CloudWatchClient({ region: "us-east-1" });

var params = {
  Dimensions: [
    {
      Name: 'LogGroupName', /* required */
    },
  ],
  MetricName: 'IncomingLogEvents',
  Namespace: 'AWS/Logs'
};

try {
  const data = await cloudwatchClient.send(new ListMetricsCommand(params));
  console.log("Success. Metrics:", JSON.stringify(data.Metrics));
  return data;
} catch (err) {
  console.log("Error", err);
}
```

Note that the signature and functionality is almost always the same as the AWS CLI, e.g the `list-metrics` requires the same parameters (command can be found [here](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudwatch/list-metrics.html)).

You can find more node.js examples [here](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/cloudwatch-examples.html)

### 6. Class Assignments

1. Create a new scheduled lambda through SAM with the node environment with the `sam init` command.
2. Copy the contents from `week3/materials/index.js` into your lambda, install the cloudwatch client with `npm install @aws-sdk/client-cloudwatch`, and run it locally `sam local invoke` (remember to be in the right folder).
3. Change the cron expression into running daily at 08:00 AM, i.e `0 8 * * *`.
4. Deploy the lambda, but name it `hyf-class-week2-{your-first-name}`.
5. Navigate into cloudformation and find your stack. Write down your ARN id of the stack.
6. Navigate into your lambda on AWS and trigger it manually (you do this by creating a test event followed by a click on the "test" button).
7. Find another classmate and make him delete your cloudformation stack through the UI.
