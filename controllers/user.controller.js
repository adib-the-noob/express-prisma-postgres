import prisma from "../database/db.config.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
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
                    password: password
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