import fs from 'fs';
import * as csv from 'fast-csv';
import { OrderModel } from '../models/order.model';
import { ProductModel } from '../models/product.model';
import { CustomerModel } from '../models/customer.model';
import { SalesModel } from '../models/sales.model';
import path from 'path';

export const loadCSV = async () => {
    const filePath = path.join(__dirname, '../../salesData.csv');
  
    const stream = fs.createReadStream(filePath);
    const csvData: Record<string, string>[] = [];
    
    const parser = csv.parse({ headers: true })
      .on('data', (row: Record<string, string>) => csvData.push(row)) 
      .on('end', async () => { 
        try {
          for (const row of csvData) {
      
            if (!row['Order ID'] || !row['Product ID'] || !row['Customer ID'] || !row['Region']) {
              console.error(`Missing data in row: ${JSON.stringify(row)}`);
              continue;
            }
  
            const orderDate = new Date(row['Date of Sale']); 
            if (isNaN(orderDate.getTime())) {  
              console.error(`Invalid date in row: ${JSON.stringify(row)}`);
              continue;
            }

            
            let customer = await CustomerModel.findOne({ customer_id: row['Customer ID'] });
            if (!customer) {
              console.log(`Customer not found. Creating customer with ID: ${row['Customer ID']}`);
              customer = new CustomerModel({
                customer_id: row['Customer ID'],
                name: row['Customer Name'],
                email: row['Customer Email'],
                address: row['Customer Address'],
              });
              await customer.save();
            }
  
            let product = await ProductModel.findOne({ product_id: row['Product ID'] });
            if (!product) {
              console.log(`Product not found. Creating product with ID: ${row['Product ID']}`);
  
            
              const productName = row['Product Name'];
              const unitPrice = parseFloat(row['Unit Price']);
              
           
              if (!productName || isNaN(unitPrice)) {
                console.error(`Invalid product data in row: ${JSON.stringify(row)}`);
                continue; 
              }
  
              product = new ProductModel({
                product_id: row['Product ID'],
                name: productName,
                category: row['Category'],
                unitPrice: unitPrice,
              });
              await product.save();
            }
  

            let order = await OrderModel.findOne({ order_id: row['Order ID'] });
            if (order) {
              console.log(`Order with ID ${row['Order ID']} already exists. Skipping this row.`);
              continue; 
            }
  
            const totalAmount = parseFloat(row['Quantity Sold']) * parseFloat(row['Unit Price']) 
                                - parseFloat(row['Discount']) + parseFloat(row['Shipping Cost']);
            
            
            order = new OrderModel({
              order_id: row['Order ID'],
              customer_id: row['Customer ID'],  
              orderDate: orderDate,  
              totalAmount: totalAmount,  
            });
            await order.save();
  
            const sale = new SalesModel({
              sale_id: row['Order ID'],
              order_id: order.order_id,  
              product_id: row['Product ID'],  
              quantitySold: parseInt(row['Quantity Sold']),
              discount: parseFloat(row['Discount']),
              shippingCost: parseFloat(row['Shipping Cost']),
              region: row['Region'],  
            });
            await sale.save();
          }
          console.log('Data loaded successfully!');
        } catch (error) {
          console.error('Error loading data:', error);
        }
      });
  
    stream.pipe(parser); 
  };