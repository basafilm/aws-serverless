
const tableName = process.env.SUBSCRIPTIONS_TABLE
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

exports.subscriptionsHandler = async (event, context) => {
  let body;
  let statusCode = 200;

  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with",
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE,PATCH",   
};

  try {
    switch (event.httpMethod) {
      case "DELETE /{id}":
        await docClient
          .delete({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /{id}":
        body = await docClient
          .get({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET":
        body = await docClient.scan({ TableName: tableName }).promise();
        break;
      case "PUT":
        let requestJSON = JSON.parse(event.body);
        await docClient
          .put({
            TableName: tableName,
            Item: {
              id: requestJSON.id,
              productId: requestJSON.productId,
              name: requestJSON.name,
              email: requestJSON.email,
              createdOn: requestJSON.createdOn
            }
          })
          .promise();
        body = `Put item ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.httpMethod}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
