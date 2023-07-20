// import { Schema, model, models, Model } from 'mongoose';
// import { IStock } from '../interfaces/IStock';

// const stockSchema = new Schema(
//   {
//     symbol: { type: String, required: true },
//     name: { type: String, required: true },
//     exchange: { type: String, required: true },
//   },
//   { collection: 'stocks' }, // Specify the collection name as 'stocks'
// );

// const Stock: Model<IStock> =
//   models.Stock || model<IStock>('Stock', stockSchema);

// export default Stock;

// stockModel.ts
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
