import { ObjectId } from "mongodb";
import { getCollection } from "./getCollection";

export type User = {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
};

export type UserResponse<T> = {
  statusCode: number;
  message?: string;
  data: T;
  error?: string;
};

export const getUsers = async () => {
  const db = await getCollection();
  const users = await db.collection("Users").find().toArray() as User[];
  return users;
};

export const updateUser = async (user: User) => {
  const db = await getCollection();
  const users = await db.collection("Users").updateOne({ _id: new ObjectId(user._id) }, { $set: {firstName: user.firstName, lastName: user.lastName, position: user.position, phone: user.phone, email: user.email} });
  const updatedUser = await db.collection("Users").find().toArray() as User[];
  return updatedUser;
}

export const newUser = async (user: User) => {
  const db = await getCollection();
  const users = await db.collection("Users").insertOne(user);
  const newUser = await db.collection("Users").findOne({_id: users.insertedId}) as User;
  return newUser;
}