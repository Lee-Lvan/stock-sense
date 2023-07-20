export interface IStock {
  symbol: string;
  name: string;
  exchange: string;
  access: {
    plan: string;
  }
};