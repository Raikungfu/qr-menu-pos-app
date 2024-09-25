export interface ShopZone {
  readonly id: number;
  name: string;
  tables: ShopTable[];
}

export interface ShopTable {
  readonly id: number;
  name: string;
  status: ShopActionTypes;
}

export enum ShopActionTypes {
  OPEN_TABLE = "Bàn mở",
  CLOSE_TABLE = "Bàn trống",
}
