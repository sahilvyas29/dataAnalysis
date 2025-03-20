import express from 'express';
import { totalRevenue, totalRevenueByCategory, totalRevenueByProduct, totalRevenueByRegion } from '../controllers/revenue.controller';

const router = express.Router();

// Route to calculate total revenue for a date range
router.get('/total-revenue', totalRevenue);

// Route to calculate total revenue by product for a date range
router.get('/total-revenue-by-product', totalRevenueByProduct);


// Route for Total Revenue by Category
router.get('/total-revenue-by-category', totalRevenueByCategory);

// Route for Total Revenue by Region
router.get('/total-revenue-by-region', totalRevenueByRegion);

export default router;
