const tableName = process.env.PRODUCTS_TABLE;

const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

exports.getAllItemsHandler = async (event) => {
  // All log statements are written to CloudWatch
  console.info("received:", event);

  var params = {
    TableName: "?",
  };
  const data = await docClient.scan(params).promise();
  const items = data.Items;

  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
