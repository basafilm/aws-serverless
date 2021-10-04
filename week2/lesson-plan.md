# Week 2 : Storage

## Pre-requisites:

Exercises from week 1 / configured credentials for AWS.

## Lesson Plan:

### 1. Storage overview

Cloud storage is a useful and fundemental offering from cloud vendors with great flexibility for serverless storage. We can use it to store files/objects in given "buckets". This includes serving a static website.

Cloud storage can also be used to store, move, transform and process large files by other jobs/services for our data jobs, also known as an [ETL Pipeline](https://www.snowflake.com/guides/etl-pipeline#:~:text=An%20ETL%20pipeline%20is%20the,and%20move%20it%20to%20another.).

S3 can likewise trigger events on file actions, e.g on file upload or file deletion (as we will see in week4). Files and buckets can also contain security rules for access which means we can tailor custom access for a great deal of use cases where security is important.

### 2. Static web hosting

Start of by creating a simple react app with the [create-react-app](https://github.com/facebook/create-react-app), i.e

`npm create-react-app my-bike-shop`

Then compile the app by execyting `npm run build`. This will create the files for the websites we need to upload to S3.

To upload the files, we first need a bucket by using the [create-bucket](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/create-bucket.html) command.

`aws s3api create-bucket --bucket my-bucket --region us-east-1`

Then we leverage the [sync command](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html), to sync our freshly build files to the bucket.

`aws s3 sync ./build s3://my-bucket`

Finally, we enable web hosting with the [website command](https://docs.aws.amazon.com/cli/latest/reference/s3/website.html)

`aws s3 website s3://my-bucket/ --index-document index.html --error-document error.html`

### 3. Class Assignments

1. Perform the above steps on your own website. Don't touch any react code yet, but just upload the contents.
2. Navigate into the UI and find your bucket. What is the url, and what is the bucket policy?
3. Make a change to your website and reflect the changes to your bucket with the `sync` command.
4. Find someone inclass and make them visit and verify your website works.
5. Once they have verified the website, ask them to delete the bucket through the CLI.
6. Write a few reasons down on why cloud storage is serverless (either alone of with a friend).
