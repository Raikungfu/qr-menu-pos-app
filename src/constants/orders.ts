type Order = {
  Code: number;
  Time: string;
  Status: string;
  Price: string;
  Quantity: string;
  Table: string;
  PaymentStatus: string;
  PaymentMethod: string;
};

type StatusOrderListCount = {
  CountAll: number;
  CountPENDING: number;
  CountCONFIRMED: number;
  CountPROCESSING: number;
  CountPROCESSED: number;
  CountCOMPLETED: number;
  CountCANCELLED: number;
};

type OrderList = {
  Date: string;
  Children: Order[];
}[];

type Item = {
  ProductId: number;
  Quantity: number;
  Size: string;
  Option: Option[];
  Note: string;
  Price: number;
};

type Option = {
  Id: number;
  Name: string;
};

export enum OrderStatus {
  ALL = "Tất cả",
  PENDING = "Chờ xác nhận",
  CONFIRMED = "Đã xác nhận",
  PROCESSING = "Đang xử lý",
  PROCESSED = "Đã chế biến",
  COMPLETED = "Hoàn thành",
  CANCELLED = "Đã Hủy",
}

type OrderItem = {
  OrderItemId: number;
  MenuItemId: number;
  Note: string;
  SizeOptions: string;
  Quantity: number;
  Name: string;
  Image: string;
  Description: string;
  ItemPrice: number;
  Type: string;
};

export type { Order, OrderList, Item, OrderItem, StatusOrderListCount };
