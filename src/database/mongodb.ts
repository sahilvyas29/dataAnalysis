import mongoose from 'mongoose';
import {loadCSV} from '../utils/loadData';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

export class MongoDB {
    private static instance: MongoDB;
    private connection: mongoose.Connection;

    private constructor() {
        this.connection = mongoose.connection;
        this.handleEvents();
    }

    static getInstance(): MongoDB {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
            logger.info("MongoDB instance created");
        }

        return MongoDB.instance;
    }

    private handleEvents() {
        this.connection.on('connected', () => {
            logger.info("MongoDB connected");
        });

        this.connection.on('disconnected', () => {
            logger.info("MongoDB disconnected");

        });

        this.connection.on('error', (error: any) => {
            logger.error("MongoDB connection error: " + error);

        });
    }

    async connect(): Promise<void> {
        try {
            if (!process.env.DB_URI) {
                logger.error("DB_URI is not defined");
                throw new Error('DB_URI environment variable is not defined');
            }
            
            await mongoose.connect(process.env.DB_URI, {
                autoIndex: true,
                connectTimeoutMS: 10000,
                socketTimeoutMS: 45000,
            });
            logger.info("MongoDB connection successful");

            mongoose.set('strictQuery', true);
            loadCSV();
        } catch (error: any) {
            logger.error("Error connecting to MongoDB: " + error);

            throw error;
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.connection.close(true);
            logger.info("MongoDB disconnected successfully");

        } catch (error: any) {
            logger.error("Error disconnecting MongoDB: " + error);

            throw error;
        }
    }
}
