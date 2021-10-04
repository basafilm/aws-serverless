const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

exports.scheduledEventLoggerHandler = async () => {
    const client = new S3Client({ region: "us-east-1" });

    // create data
    let header = "category,name,price,currency\n"
    let data = [header, ...createInventoryData()].join("")

    // upload data
    const params = {
        Bucket: "hyf-serverless-course-inventory-uploading",
        Key: "inventory-example.csv",
        Body: data,
    };

    let result = await client.send(new PutObjectCommand(params))
    console.log(result)
}

const categories = ["fruits", "vegatables", "meat", "flowers", "icecreams", "spices"]
const categoryMaps = {
    "fruits": ["strawberry", "apples", "pears", "oranges", "water melons"],
    "vegatables": ["carrots", "cucumbers", "spinach"],
    "meat": ["chicken", "beef"],
    "flowers": ["roses", "lillies"],
    "icecreams": ["vanilla", "rainbow", "salt caramel"],
    "spices": ["chili", "curry"],
}

const createInventoryData = () => {
    items = []
    for (let i = 0; i < 200; i++) {
        let category = categories[getRandomInt(categories.length)]
        let categoryNames = categoryMaps[category]
        let categoryName = categoryNames[getRandomInt(categoryNames.length)]
        let price = getRandomInt(500)

        items.push([category, categoryName, price, "$"].join(",") + "\n")
    }

    return items
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}