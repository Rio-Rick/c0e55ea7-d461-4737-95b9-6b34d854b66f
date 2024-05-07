import { Db } from "mongodb";
import { getMongoClientInstance } from "../config";

const DATABASE_NAME = process.env.MONGODB_DB_NAME;

export const getCollection = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};