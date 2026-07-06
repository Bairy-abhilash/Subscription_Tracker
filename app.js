import express from 'express';
import {PORT} from './config/env.js';
const app = express();

//first route
app.get('/', (req, res) => {
    res.send('Welcome to the Subscription Tracker API!');
});

//listen for requests
app.listen(PORT, 'localhost', () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
});
export default app;