import express from 'express';
import { json } from 'body-parser';
import userRouter from './router/userRouter';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());

// Routes
app.use('/users', userRouter);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});