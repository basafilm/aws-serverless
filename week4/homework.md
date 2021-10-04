# Homework for Week #4

## Overview

The Good Green Groceries sales team has once again shown their brilliant creativity by allowing all kind of vendors upload their inventory lists to a public S3 bucket. They now want you to scan the uploaded files for specific categories and items within a specific price range. They are also tired of logging into AWS (where they are creating a great deal of havoc!) so they asked if we could kindly post the results in a specific Slack channel.

We only care about the **vegetables** and **fruits** categories, with a price under 10$. Once the file is scanned, we will then publish a SNS.

In the end, you will have two lambdas. A lambda triggered by a file upload which publishes a SNS on completion, triggering a second lambda deleting the uploaded file. 

## Assignments

### Part I
1. Green Good Groceries already had some old lambda in place from previously which we are lucky to use. It even have tests, a test bucket and a test file! Navigate to the lambda in the folder `homework-assignment` and run the command `npm run test` or `npm run test --watch` to execute the tests. You can also run the lambda itself with the command `sam local invoke S3JsonLoggerFunction --event events/event-s3.json`.
2. Implement the functionality for listing all groceries and fruit categories with the cost of under 10.0$. Also find the maximum and minimum prices of all the valid candidates you just found.
3. Once done, we need to send this to a webhook of the slack channel. You will get the webhook endpoint in slack. We will leave it to you to decide how to perform the http requests (one way is using `fetch`). Here is a curl example of a slack webhook: 

```bash
curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/{webhook-url}
```

The text posted in slack should include the following: 
- your credentials
- the name of the file scanned
- the number of candidates you found
- the min/max prices of the candidates 

4. Deploy your lambda to a new cloudformation stack called `week4-lambda-s3-scanner-${your-credentials}`.

## Part II
5. Make your lambda publish a SNS with the topic `INVENTORY_SCAN_COMPLETE_${your-credentials}` with a message body containing the `objectID`of the event. This object id will be used to delete the file in your SNS lambda. You will need to uncomment the SAM policies inside the `template.yaml` and provide the relevant SNS in the template.
6. Create a new lambda which listens to the SNS topic `INVENTORY_SCAN_COMPLETE_${your-credentials}`. Extract the `objectID` from the event body, and then make the lambda delete the given file through the S3 client of the AWS SDK. To test this, feel free to use the event under `week4/materials/assignments/events/custom-delete-event.json` for local development.
7. Deploy your lambda to a new cloudformation stack called `week4-lambda-sns-subscriber-${your-credentials}`.
8. Write both your cloudformation ARN into the `assignments.md` file. 

Congratulations, the sales department of Good Green Groceries is now content! (for now...)

## Optional assignments

6. Make your slack message even more fancy (see [here](https://api.slack.com/messaging/webhooks#advanced_message_formatting) for the slack documentation)
7. Good Green Groceries sales is once again exelling us with good ideas. For each category, they want the min, max, average and total values. Attach it to the message as well.
