import { MongoDB } from "./database/mongodb";
import express from 'express';
import revenueRoutes from './routes/revenue.routes';




const app = express();

app.use(express.json());



app.use('/api/revenue', revenueRoutes);


  async function startServer() {
    try {
        await MongoDB.getInstance().connect();

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
          });

    } catch (error: any) {
        process.exit(1);
    }
}


startServer();
