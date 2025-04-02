import { createUser } from "../controllers/user.controller.js";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post('/create-user', createUser);
export default authenticationRouter;