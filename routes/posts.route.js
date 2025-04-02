import { createPost, countTotalPost } from "../controllers/posts.controller.js";
import { getCurrentUser } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const postsRouter = Router();

postsRouter.post('/create-post', getCurrentUser, createPost);
postsRouter.get('/count-total-posts', getCurrentUser, countTotalPost);

export default postsRouter;

