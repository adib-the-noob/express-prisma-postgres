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
            }, 
            select: {
                id: true,
                title: true,
                content: true,
                created_at: true,
                updated_at: true,
                comment_count: true
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

export const countTotalPost = async (req, res) => {
    try {
        const user = req.user;
        const totalPosts = await prisma.post.findMany({
            where: {
                userId: parseInt(user.id)
            },
            select: {
                id: true
            }
        }).then(posts => {
            return posts.length;
        });
        res.status(200).json({
            status: "success",
            message: "Fetched",
            data: {
                total_posts: totalPosts
            }
        })
    } catch (error) {
        res.status(501).json({
            status: "Failed",
            message: error.message,
            data: {}
        })
    }
}