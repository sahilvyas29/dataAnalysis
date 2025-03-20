import { Schema, model, Document } from "mongoose";
import IProduct from "../interfaces/modelInterfaces/productModel.interface";

const productModel = new Schema<IProduct>({
    product_id:{type:String, unique:true, require: true},
    name:{type:String, required:true},
    category:{type:String, required: true},
    unitPrice:{type:Number, required:true},
},
{
    timestamps: true, 
  });

export const ProductModel = model<IProduct>('Product', productModel);