import express from 'express'
const router = express.Router();
import { getUserById, getCommentsByUserId } from "../db/pool.js"

import { isSignedIn } from "./middleWares.js"
router
    .get("", isSignedIn(), async (req, res) => {
        try {
            let user = await getUserById(req.user.user_id);
            let comments = await getCommentsByUserId(req.user.user_id);
            let admin = false;
            let userID = req.user.user_id.toString();
            if (userID === process.env.ADMIN) {
                admin = true;
            }
            else {
                admin = false;
            }
            res.render("profile", { loggedIn: true, user: user[0], admin, comments });
        }
        catch (e) {
            res.redirect("/");
        }
    });
export default router;