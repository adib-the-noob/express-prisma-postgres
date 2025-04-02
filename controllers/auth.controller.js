import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../database/db.config.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config.js";

export const userRegistration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing_user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!existing_user) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            console.log(hashedPassword);
            const new_user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword,
                },
            });
            const token = jwt.sign({ id: new_user.id }, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN,
            });
            res.status(201).json({
                message: "User Created",
                status: "success",
                data: {
                    user: new_user,
                    token: token,
                },
            });
        } else {
            res.status(409).json({
                message: "User Already Exists",
                status: "failed",
                data: {},
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "failed",
            data: {},
        });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            res.status(400).json({
                message: "Email or Password is missing!",
                status: "failed",
                data: {}
            });
        } else {
            const exsistingUser = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })
            if (!exsistingUser) {
                res.status(404).json({
                    message: "User Not Found!",
                    status: "failed",
                    data: {}
                });
            } else {
                const token = jwt.sign({
                    email: exsistingUser.email
                }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
                res.status(200).json({
                    message: "Logged in successfully!",
                    status: "success",
                    data: {
                        "token": token
                    }
                });
            }
        }
    } catch (error) {
        res.status(404).json({
            message: "Logged in Failed!",
            status: "failed",
            data: {}
        })
    }
}