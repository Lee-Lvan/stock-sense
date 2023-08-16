import { ObjectId } from 'mongodb';

export type HoldingsT = {
  _id: ObjectId;
  name: string;
  exchange: string;
  quantity: number;
  buyPrice: string;
  totalPrice: string;
};
