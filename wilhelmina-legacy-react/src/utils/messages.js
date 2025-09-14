
import {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });

const TABLE_NAME = "YourTableName"; // 🔁 Replace with your actual table name

// Store a message in DynamoDB
export async function storeMessage(userId, message) {
  const command = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: {
      userId: { S: userId },
      message: { S: message },
      timestamp: { S: new Date().toISOString() }
    }
  });

  await client.send(command);
}

// Retrieve all messages from DynamoDB
export async function getMessages() {
  const command = new ScanCommand({ TableName: TABLE_NAME });
  const response = await client.send(command);

  const items = response.Items ?? [];

  return items.map((item) => ({
    userId: item.userId?.S ?? "",
    message: item.message?.S ?? "",
    timestamp: item.timestamp?.S ?? ""
  }));
}

