export type CompanyData = {
  symbol: string;
  name: string;
  exchange: string;
  is_market_open: boolean;
  close: string;
  currency: string;
  change: string;
  percent_change: string;
  volume: string;
  fifty_two_week: {
    low: string;
    high: string;
  };
};
