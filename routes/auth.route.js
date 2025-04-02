import {
    createUser,
    updateUser,
    fetchAllUsers
} from "../controllers/user.controller.js";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post('/create-user', createUser);
authenticationRouter.put('/update-user/:user_id', updateUser);
authenticationRouter.get('/get-all-users', fetchAllUsers);

export default authenticationRouter;