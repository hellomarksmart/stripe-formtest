import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const DynamoClient = new DynamoDBClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIAXTNPVEPDGEI7CCG2',
    secretAccessKey: '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',
  },
});

export const getItem = async (TableName, Key) => {
  try {
    const params = {
      TableName,
      Key: marshall(Key),
    };
    const command = new GetItemCommand(params);
    const { Item } = await DynamoClient.send(command);
    if (!Item) return undefined;
    return unmarshall(Item);
  } catch (error) {
    throw new Error(error);
  }
};

export const putItem = async (TableName, Item) => {
  try {
    const params = {
      TableName,
      Item: marshall(Item),
    };
    const command = new PutItemCommand(params);
    await DynamoClient.send(command);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};
