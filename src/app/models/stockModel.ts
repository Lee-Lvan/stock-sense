import { Schema, model, models, Document } from 'mongoose';

export interface IStock extends Document {
  symbol: string;
  name: string;
  exchange: string;
}

const stocksSchema = new Schema<IStock>(
  {
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    exchange: { type: String, required: true },
  },
  { collection: 'stocks' },
);

const Stock = models.stocks || model('stocks', stocksSchema);

export default Stock;
