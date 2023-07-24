import { ObjectId } from "mongodb";

export type HoldingsT = {
  _id: ObjectId;
  name: string;
  price: number;
  quantity: number;
};
