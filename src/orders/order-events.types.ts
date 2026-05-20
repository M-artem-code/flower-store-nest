export type OrderEventPayload = {
  orderId: string;
  source: 'api' | 'orders';
  message: string;
  timestamp: string;
};
