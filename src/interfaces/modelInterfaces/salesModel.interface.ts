import { Document } from "mongoose";

export default interface ISales extends Document {
    sale_id: string;
    order_id: string;  
    product_id: string; 
    quantitySold: number;
    discount: number;
    shippingCost: number;
    region: string;
    createdAt?: Date;
    updatedAt?: Date;
  }