import express from 'express'
const router = express.Router();
import { getPostById, getCommentsByPostId } from "../db/pool.js"

router
    .get("", async (req, res, next) => {
        let postId = req.query.id;
        let post;
        let admin = false;
        let userId = 0;
        let comments = [];
        try {
            try {
                userId = req.user.user_id.toString();
            }
            catch(e){
                userId = 0;
            }
            post = await getPostById(postId);
            post = await getPostById(postId);
            comments = await getCommentsByPostId(postId);
            console.log()
            if (userId === process.env.ADMIN) {
                admin = true;
            }
            if (post.length) {
                return res.render("post", { loggedIn: req.isAuthenticated(), post: post[0], comments, admin, userId });
            }
            next();
        }
        catch (err) {
            next();
        }
    })

export default router;