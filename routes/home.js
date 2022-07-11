import express from 'express'
const router = express.Router();
import { getPosts } from "../db/pool.js";


router
    .get("/", async (req, res) => {
        let posts;
        let admin;
        try {
            posts = await getPosts();
            try {
                let userID = req.user.user_id.toString();
                if (userID === process.env.ADMIN) {
                    admin = true;
                }
                else {
                    admin = false;
                }
            }
            catch (err) {
                admin = false;
            }
        }
        catch (err) {
            console.log(err);
            posts = [];
        }
        finally {
            res.render("home", { loggedIn: req.isAuthenticated(), posts: posts, admin: admin });
        }
    })
export default router;