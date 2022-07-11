import express from 'express'
const router = express.Router();
import pool, { getPostById } from "../db/pool.js"

import { isSignedIn, isAdmin } from "./middleWares.js"

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

router
    .get("", isSignedIn(), isAdmin(), async (req, res) => {
        try {
            let postId = req.query.id;
            let post = await getPostById(postId)
            res.render("edit", { loggedIn: req.isAuthenticated(), post: post[0] });
        }
        catch (e) {
            res.redirect("/");
        }
    })
    .post("", isSignedIn(), isAdmin(), async (req, res) => {
        let title = capitalizeFirstLetter(req.body.title);
        let body = capitalizeFirstLetter(req.body.body);
        let url = req.body.url;
        let id = req.body.id;
        pool.query("UPDATE posts SET title = ?,body=?, img_URL = ? WHERE id = ?; ", [title, body, url, id], (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("error:server error");
                return;
            }
            res.redirect("/");
        })
    });
export default router;