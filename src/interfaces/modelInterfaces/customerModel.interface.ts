import { Document } from "mongoose";

export default interface ICustomer extends Document {
    customer_id: string;
    name: string;
    email: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
  }