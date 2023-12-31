export type GraphSymbolT = {
  meta: MetaT;
  values: ValuesT[];
  status: string;
};

export type ValuesT = {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

type MetaT = {
  symbol: string;
  interval: string;
  currency: string;
  exchange_timezone: string;
  exchange: string;
  mic_code: string;
  type: string;
};


export interface IWatchlistData  {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  change: string;
  is_market_open: boolean;
  fifty_two_week: {
    low: string;
    high: string;
  }
}

export interface ISearchRes {
  _id: string;
  symbol: string;
  instrument_name: string;
  exchange: string;
}

