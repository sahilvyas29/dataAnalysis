import { Schema, model,Document } from "mongoose";
import ISales from "../interfaces/modelInterfaces/salesModel.interface";

const salesModel: Schema<ISales> = new Schema({
    sale_id: { type: String, required: true, unique: true },
    order_id: { type: String, required: true },  
    product_id: { type: String, required: true }, 
    quantitySold: { type: Number, required: true },
    discount: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    region: { type: String, required: true },
  },
  {
    timestamps: true,  
  });
  
  export const SalesModel = model<ISales>('Sales', salesModel);