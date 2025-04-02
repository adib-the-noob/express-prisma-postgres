import { createPost } from "../controllers/posts.controller.js";
import { getCurrentUser } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const postsRouter = Router();

postsRouter.post('/create-post', getCurrentUser, createPost);

export default postsRouter;

