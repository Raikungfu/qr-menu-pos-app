type Order = {
  code: string;
  time: string;
  status: string;
  price: string;
  quantity: string;
  table: string;
  paymentStatus: string;
  paymentMethod: string;
};

type OrderList = {
  date: string;
  children: Order[];
}[];

type Item = {
  productId: number;
  quantity: number;
  size: string;
  option: Option[];
  note: string;
  price: number;
};

type Option = {
  id: number;
  name: string;
};

enum OrderStatus {
  ALL = "Tất cả",
  PENDING = "Chờ xác nhận",
  CONFIRMED = "Đã xác nhận",
  PROCESSING = "Đang xử lý",
  PROCESSED = "Đã chế biến",
  COMPLETED = "Hoàn thành",
  CANCELLED = "Hủy",
}

export { Order, OrderList, Item, OrderStatus };
