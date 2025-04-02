import express from 'express';

// routes
import authenticationRouter from './routes/auth.route.js';
import postsRouter from './routes/posts.route.js';

const app = express();
app.use(express.json());

app.use('/auth', authenticationRouter);
app.use('/posts', postsRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
