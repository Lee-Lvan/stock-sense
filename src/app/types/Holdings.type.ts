import { ObjectId } from "mongodb";

export type HoldingsT = {
  _id: ObjectId;
  price: number;
  quantity: number;
};
