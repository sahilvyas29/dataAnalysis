import { Document } from "mongoose";

export default interface IProduct extends Document {
    product_id: string;
    name: string;
   category: string;
    unitPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
  }