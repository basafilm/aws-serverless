# Homework

## Homework exercises for Week #5

This week, Good Green Groceries have decided that they want to go into production with the new website. As such, real clients will come and order food subscriptions. This means we now have to create a DynamoDB database and provide an API for our website.

The API will only have two functionalities:

1. to fetch avaliable products
2. register new subscriptions.

## Part I: DynamoDB and API Gateway

1. We already have a minor API deployed, but it is just a placeholder. First off, create two new routes in your template. The first should be a `GET /subscriptions`, and the second a `POST /subscription`. Start of by implementing `GET /subscriptions`, fetching all items from the DyanmoDB table: `good-green-groceries-products`.

2. Create a DynamoDB table with your credentials, e.g `hyf-{your-credentials}-subscriptions`. Partition key should be `Id`
3. Creating subscriptions has the following signature:

```
POST /subscription

{
    productID: integer,
    email: string
}
```

Implement functionality for inserting. The items should contain at least the following keys `productID`, `email`, `createdOn`. 4. Deploy your API with SAM under a new cloudformation stack called: `hyf-{your-credentials}-week5-api`.

## Part II: Integrating it into the webapp
The next part will only include one assignment: to integrate the API into your own good-gree-groceries website. 

4. Implement the API into your website and redeploy the website. Write down your website url into `assignments.md`.
