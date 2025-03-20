import { Schema, model } from "mongoose";
import ICustomer from "../interfaces/modelInterfaces/customerModel.interface";

const customerModel = new Schema<ICustomer>({
    customer_id:{type: String, unique: true, required: true},
    name:{type: String, required: true},
    email:{type: String, required: true},
    address:{type: String, required: true},
},
{
    timestamps: true,  
  })

export const CustomerModel = model<ICustomer>('Customer', customerModel);
