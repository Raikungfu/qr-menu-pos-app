import { Serie } from "@nivo/line";

export type DataPoint = {
  x: string;
  y: number;
};

export type ChartData = {
  DataStatistic: DataStatistic[];
  TotalRevenue: number;
  TotalProfit: number;
  TotalCost: number;
  TotalSales: number;
};

export type DataStatistic = {
  id: string;
  data: Serie[];
};
