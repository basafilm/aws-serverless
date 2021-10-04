# Homework

## Homework exercises for Week #2

Green Good Groceries sells subscriptions on food boxes, but more plans to expand and improve are underway. Your job is to build their application using serverless, gradually each work. Luckily, Green Good Groceries have existing code, used in most exercises found under `materials/homework`.

Part I:

The first part is related to building the actual frontend website using React as the framework. Again, we start out simple but will improve it during the next couple of weeks.

1. Navigate into the folder `week2/homework` where you will find a predifined web app. Install dependencies with `npm install` and start a local server with `npm run start`.
2. Inside the file `useProducts` implement the function called `calculateSum`, such that it returns a the price sum of all selected subscriptions.
3. Inside the component `notification`, implement markup for displaying notifications. Feel free to adjust the hook `useNotification` in whatever way you find interesting.

Part II:

For this part, you will need to finish the markup for assignments found [here](https://github.com/HackYourFuture-CPH/hyf-serverless-course/blob/main/week2/materials/homework/assignments.md). You will also need to use the CLI to create/sync/upload your changes to the AWS.

You will then need to add the answers to `assignments.md` and upload it as part of your PR.

4. Create a bucket and sync the webapp application code to it (see this weeks [lesson plan](https://github.com/HackYourFuture-CPH/hyf-serverless-course/blob/main/week2/lesson-plan.md) if you are stuck)
5. Right now, the website does not support https. Explain which other AWS service needs to be integrated in order to achieve this (hint: it ends with `_____front`).
6. Figure out and write down the price per month of storing 51TB on S3? Write down the total size of your website bucket as well.
7. Write down the main cost factors for S3.
8. The file `week2/assignments/products.json` needs to be uploaded Inside the bucket `hyf-serverless-course-week-2`. Add a new product to it, rename the file so it is called `products-{your-credentials}.json` and upload the file (but **not** by using the sync command!) through the CLI and write down the command needed.
9. Write down a brief use case on when S3 could be used for a data engineering assignment.

### Additional Exercises:

10. What can be done to reduce the pricing for S3 when hosting a large number of files?
11. There are many security features built into S3. Find your favourite feature, documentation for it, and explain briefly why.
