import mongoose from 'mongoose';
import {loadCSV} from '../utils/loadData';
import dotenv from 'dotenv';

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
            console.log("here??")
        }

        return MongoDB.instance;
    }

    private handleEvents() {
        this.connection.on('connected', () => {

        });

        this.connection.on('disconnected', () => {

        });

        this.connection.on('error', (error: any) => {

        });
    }

    async connect(): Promise<void> {
        try {
            console.log("env uri", process.env.DB_URI);
            if (!process.env.DB_URI) {
                console.log("error in mongodb");
                throw new Error('DB_URI environment variable is not defined');
            }
            
            await mongoose.connect(process.env.DB_URI, {
                autoIndex: true,
                connectTimeoutMS: 10000,
                socketTimeoutMS: 45000,
            });
            mongoose.set('strictQuery', true);
            loadCSV();
        } catch (error: any) {

            throw error;
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.connection.close(true);
        } catch (error: any) {

            throw error;
        }
    }
}
