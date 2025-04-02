import express from 'express';
import authenticationRouter from './routes/auth.route.js';

const app = express();
app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.json());
app.use('/auth', authenticationRouter);
app.listen(3000, () => console.log('Server running on port 3000'));
