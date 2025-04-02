import {
    createUser,
    updateUser,
    fetchAllUsers
} from "../controllers/user.controller.js";
import { 
    userRegistration,
    userLogin
 } from "../controllers/auth.controller.js";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post('/create-user', createUser);
authenticationRouter.put('/update-user/:user_id', updateUser);
authenticationRouter.get('/get-all-users', fetchAllUsers);

// for authentication
authenticationRouter.post('/register', userRegistration);
authenticationRouter.post('/login', userLogin);

export default authenticationRouter;