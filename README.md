# dataAnalysis


Prerequisites
Node.js: v14.x or higher
npm: v6.x or higher
MongoDB: v4.x or higher
TypeScript


Installation
1. Clone the repository: https://github.com/sahilvyas29/dataAnalysis.git
cd dataAnalysis

2. Install dependencies:
   npm install

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add:
  and add DB_URI

4. Start the Server:**

   npm run start:dev

   The server will run on `http://localhost:3000`

Database Schema

The database is normalized into several collections:

- Orders:
  - Fields: `order_id`, `customer_id`, `orderDate`, `totalAmount`, etc.
  
- Products 
  - Fields: `product_id`, `name`, `category`, `unitPrice`, etc.
  
- Sales
  - Fields: `sale_id`, `order_id`, `product_id`, `quantitySold`, `discount`, `shippingCost`, `region`, etc.
  
- Customers:
  - Fields: `customer_id`, `name`, `email`, `address`, etc.


## API Endpoints

API Endpoints
Total Revenue
URL: /api/revenue/total-revenue
Method: GET
Query: startDate, endDate (YYYY-MM-DD)
Example:
GET http://localhost:3000/api/revenue/total-revenue?startDate=2023-01-01&endDate=2023-12-31
Response : [ { "_id": null, "totalRevenue": 1230 } ]


Revenue by Product
URL: /api/revenue/total-revenue-by-product
Method: GET
Query: startDate, endDate (YYYY-MM-DD)
Example:
GET http://localhost:3000/api/revenue/total-revenue-by-product?startDate=2023-01-01&endDate=2023-12-31
Response: [
  {
    "_id": "P123",
    "totalRevenue": 360,
    "productDetails": { "product_id": "P123", "name": "UltraBoost Running Shoes", "category": "Shoes" }
  }
]


Revenue by Category
URL: /api/revenue/total-revenue-by-category
Method: GET
Query: startDate, endDate (YYYY-MM-DD)
Example:
GET http://localhost:3000/api/revenue/total-revenue-by-category?startDate=2023-01-01&endDate=2023-12-31
Response:   [
  { "_id": "Shoes", "totalRevenue": 500000 },
  { "_id": "Electronics", "totalRevenue": 600000 }
]


Revenue by Region
URL: /api/revenue/total-revenue-by-region
Method: GET
Query: startDate, endDate (YYYY-MM-DD)
Example:
GET http://localhost:3000/api/revenue/total-revenue-by-region?startDate=2023-01-01&endDate=2023-12-31
Response:[ { "_id": "North America", "totalRevenue": 1000000 } ]


