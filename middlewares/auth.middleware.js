import prisma from "../database/db.config.js";
import { JWT_SECRET } from "../config.js";
import jwt from 'jsonwebtoken';

export const getCurrentUser = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "No Bearer Token!"
            })
        }
        const decode = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { email: decode.email }
        });
        if (!user) {
            return res.status().json({
                status: "error",
                message: "Not Authenticated!"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(404).json({
            message: "No Credentials found!",
            status: "failed",
            data: {}
        })
    }
}