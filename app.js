import express from 'express';
import {PORT} from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import errorMiddleware from './middlewares/error.middleware.js'
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);

//first route
app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API!');
});

const startServer = async () => {
    const server = app.listen(PORT, async () => {
        console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

        try {
            await connectToDatabase();
        } catch (error) {
            console.error('Database connection could not be established:', error.message || error);
        }
    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use. Please stop the other process and try again.`);
            process.exit(1);
        }

        console.error('Server error:', error);
        process.exit(1);
    });
};

startServer();

export default app;