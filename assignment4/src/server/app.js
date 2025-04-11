import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/products.js';
import { LoggingMiddleware } from './middleware/logging.js';
import errorHandler from './middleware/errorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = 3001;

const server = express();

// Middlewares
server.use(express.json());
server.use(LoggingMiddleware);
server.use(express.static(path.join(__dirname, '../../dist')));
server.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
server.use('/api/products', productRoutes);

// Serve index.html for all other routes
server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

//Error Handler Middleware
server.use(errorHandler);

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/inft2202");
        console.log('Database connected successfully.');

        // Start server
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
