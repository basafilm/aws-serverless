const { CloudWatchClient } = require("@aws-sdk/client-cloudwatch");
const { GetMetricDataCommand } = require("@aws-sdk/client-cloudwatch");

exports.scheduledEventLoggerHandler = async () => {
  const cloudwatchClient = new CloudWatchClient({ region: "us-east-1" });

  let params = {
    Dimensions: [
      {
        Name: "LogGroupName",
      },
    ],
    MetricName: "IncomingLogEvents",
    Namespace: "AWS/Logs",
  };

  const data = await cloudwatchClient.send(new ListMetricsCommand(params));

  console.log("Success. Metrics:", JSON.stringify(data.Metrics));
};
