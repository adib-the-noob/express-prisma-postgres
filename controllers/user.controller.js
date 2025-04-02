import prisma from "../database/db.config.js";

export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const existing_user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (existing_user) {
            res.send({
                "message": "User Already taken!"
            })
        } else {
            const new_user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                }
            })
            res.json({
                'message': "user created!",
                data: new_user
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { name, email, password } = req.body;
        const updated_user = await prisma.user.update({
            where: {
                id: Number(user_id)
            },
            data: {
                name: name,
                email: email,
                password: password
            }
        });
        res.json({
            message: "User Updated",
            data: updated_user
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const fetchAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json({
            message: "All Users",
            data: users
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}