import { Document } from "mongoose";

export default interface IOrder extends Document {
    order_id: string;
    customer_id: string; 
    orderDate: Date;
    totalAmount: number;
    createdAt?: Date;
    updatedAt?: Date;
  }