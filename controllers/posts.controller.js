import prisma from '../database/db.config.js';

export const createPost = async (req, res) => {
    try {
        const user = req.user;
        const { title, content } = req.body;
        const new_post = await prisma.post.create({
            data: {
                userId: parseInt(user.id),
                title: title,
                content: content
            }
        });
        res.status(201).json({
            status: "success",
            message: "New post added",
            data: new_post,
        });

    } catch (error) {
        res.status(501).json({
            status: "Failed",
            message: error.message,
            data: {}
        })
    }
}