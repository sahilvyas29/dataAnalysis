import { Request, Response } from 'express';
import { OrderModel } from '../models/order.model';
import { SalesModel } from '../models/sales.model';
import { ProductModel } from '../models/product.model';
import logger from '../utils/logger';

export const totalRevenue = async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
  
      const totalRevenue = await OrderModel.aggregate([
        {
          $match: {
            orderDate: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalAmount' },
          },
        },
      ]);
  
      res.json(totalRevenue);
      logger.info("Total revenue calculated");

    } catch (error) {
      logger.error('Error calculating total revenue:', error);
      res.status(500).json({ message: 'Error calculating total revenue' });
    }
};

export const totalRevenueByProduct = async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
  
      const start = new Date(startDate as string);
      let end = new Date(endDate as string);
      end.setHours(23, 59, 59, 999);
  
      const totalRevenueByProduct = await SalesModel.aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: 'order_id',
            foreignField: 'order_id',
            as: 'orderDetails',
          },
        },
        {
          $unwind: '$orderDetails',
        },
        {
          $match: {
            'orderDetails.orderDate': { $gte: start, $lte: end },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'product_id',
            foreignField: 'product_id',
            as: 'productDetails',
          },
        },
        {
          $unwind: '$productDetails',
        },
        {
          $group: {
            _id: '$product_id',
            totalRevenue: { 
              $sum: { 
                $multiply: [
                  '$quantitySold',
                  '$productDetails.unitPrice'
                ] 
              }
            },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'product_id',
            as: 'productDetails',
          },
        },
        {
          $unwind: '$productDetails',
        },
      ]);
      logger.info("Total revenue by product calculated");
      res.json(totalRevenueByProduct);
    } catch (error) {
      logger.error('Error calculating total revenue by product:', error);
      res.status(500).json({ message: 'Error calculating total revenue by product' });
    }
};

export const totalRevenueByCategory = async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
  
      const start = new Date(startDate as string);
      let end = new Date(endDate as string);
      end.setHours(23, 59, 59, 999);
  
      const totalRevenueByCategory = await SalesModel.aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: 'order_id',
            foreignField: 'order_id',
            as: 'orderDetails',
          },
        },
        {
          $unwind: '$orderDetails',
        },
        {
          $match: {
            'orderDetails.orderDate': { $gte: start, $lte: end },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'product_id',
            foreignField: 'product_id',
            as: 'productDetails',
          },
        },
        {
          $unwind: '$productDetails',
        },
        {
          $group: {
            _id: '$productDetails.category',
            totalRevenue: { 
              $sum: { 
                $multiply: ['$quantitySold', '$productDetails.unitPrice']
              } 
            },
          },
        },
      ]);
      logger.info("Total revenue by category calculated");

      res.json(totalRevenueByCategory);
    } catch (error) {
      logger.error('Error calculating total revenue by category:', error);
      res.status(500).json({ message: 'Error calculating total revenue by category' });
    }
};

export const totalRevenueByRegion = async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
  
      const start = new Date(startDate as string);
      let end = new Date(endDate as string);
      end.setHours(23, 59, 59, 999);
  
      const totalRevenueByRegion = await SalesModel.aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: 'order_id',
            foreignField: 'order_id',
            as: 'orderDetails',
          },
        },
        {
          $unwind: '$orderDetails',
        },
        {
          $match: {
            'orderDetails.orderDate': { $gte: start, $lte: end },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'product_id',
            foreignField: 'product_id',
            as: 'productDetails',
          },
        },
        {
          $unwind: '$productDetails',
        },
        {
          $group: {
            _id: '$region',
            totalRevenue: { 
              $sum: { 
                $multiply: [
                  '$quantitySold',
                  { $ifNull: ['$productDetails.unitPrice', 0] }
                ] 
              } 
            },
          },
        },
      ]);
      logger.info("Total revenue by region calculated");

      res.json(totalRevenueByRegion);
    } catch (error) {
      logger.error('Error calculating total revenue by region:', error);
      res.status(500).json({ message: 'Error calculating total revenue by region' });
    }
};
