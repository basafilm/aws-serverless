# Homework

## How to deliver homework

Open this template repository https://github.com/HackYourFuture-CPH/masterclass-hyf-homework and click on ![image](https://user-images.githubusercontent.com/6642037/115988976-3796da80-a5bc-11eb-9184-554a2218b2ae.png) and then create a copy of this structure on your own GitHub profile with the name `masterclass-hyf-HYF-homework`

Create a PR to add your homework to the respective week folder like you are used to do in the web development course, and if you don't remember how to do hand in homework using Pull Requests, please check here https://github.com/HackYourFuture-CPH/master-class-template

## Homework exercises for Week #1

**Meet Green Good Groceries - a newly founded company ready to transfer their small startup business to the cloud. Until now, they have only been physichal with a small but expensive website. Your mission is to help them transform and digitilize them in a cheap, flexible and solid manner - in which you recommended serverless!**

For theese assignments, you need to add CLI commands and/or results to the markdown file found [here](https://github.com/HackYourFuture-CPH/hyf-serverless-course/blob/main/week1/materials/homework/assignments.md).

1. The first assignment is to setup the AWS CLI credentials to be able to see solve the assignments. We have tried to add the simple instructions here, but see the full guide [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)).

**Linux**:

```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

**MacOS**:

```
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

**Windows**:

Windows users should follow this [guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html)

2. With your AWS CLI installed, we need to setup our AWS CLI credentials. You will recieve a access and secret key in class/slack to do this. Then, run `aws configure` and accept all defaults except for the access and secret keys.

3. Once credentials have been set up, use the [aws s3 ls](https://docs.aws.amazon.com/cli/latest/reference/s3/ls.html) command to list S3 buckets. How many buckets do we currently have on our AWS account?
4. Navigate into the [AWS UI Console](https://console.aws.amazon.com/console/home#) and login (credentials will once again be given in class/slack). Then, search for S3 in the search bar, and navigate into the bucket called `products-bucket`. What's the name of the file inside the bucket?

### Additional Exercises:

3. We can use the [presign](https://docs.aws.amazon.com/cli/latest/reference/s3/presign.html) command to create temporary URLs for files in a private bucket. Create a presigned url for **1 hour** for the file you found in assignment 2.
4. You can add optional arguments to the `aws s3 ls` command for making it more **human-readable** and **summarizing**. Write the final command with those arguments, and the total size of the bucket.
