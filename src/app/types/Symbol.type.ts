export type GraphSymbolT = {
  meta: MetaT;
  values: ValuesT[];
  status: string;
};

type ValuesT = {
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
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}