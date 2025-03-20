// models/order.model.ts
import mongoose, { model,Schema } from 'mongoose';
import IOrder from '../interfaces/modelInterfaces/orderModel.interface';
import { CustomerModel } from './customer.model';



const orderModel: Schema<IOrder> = new Schema({
  order_id: { type: String, required: true, unique: true },
  customer_id: { type: String, required: true },
  orderDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
},
{
    timestamps: true,  
  });

export const OrderModel = model<IOrder>('Order', orderModel);
