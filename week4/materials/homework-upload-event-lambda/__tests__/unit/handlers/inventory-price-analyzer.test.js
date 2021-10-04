const scheduledEventLogger = require('../../../src/handlers/inventory-price-analyzer.js');

describe('Test for sqs-payload-logger', function () {
  it('reads csv data', async () => {
    const event = {
      Records: [
        {
          s3: {
            bucket: {
              name: "hyf-serverless-course-inventory-uploading"
            },
            object: {
              key: "inventory-example.csv"
            }
          }
        }
      ]
    }

    await scheduledEventLogger.s3PriceAnalyzer(event, null)
  });
});
