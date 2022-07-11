import express from 'express';
const router = express.Router();
import pool from "../db/pool.js";


import { isSignedIn, isAdmin } from "./middleWares.js"

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
router
    .get("/post", isSignedIn(), isAdmin(), (req, res) => {
        res.render("submit", { loggedIn: true });
    })
    .post("/post", isSignedIn(), isAdmin(), (req, res) => {
        let title = capitalizeFirstLetter(req.body.title);
        let body = capitalizeFirstLetter(req.body.body);
        let url = req.body.url;
        let id = req.user.user_id;
        pool.query("INSERT INTO posts (user_id,title,body,img_URL) VALUES (?,?,?,?);", [id, title, body,url], (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("error:server error");
                return;
            }
            res.redirect("/");
        })
    })
    .post("/comment", isSignedIn(), (req, res) => {
        let comment = req.body.comment;
        let postId = req.body.postId;
        let userId = req.user.user_id;
        pool.query("INSERT INTO comments (post_id,user_id,body) VALUES (?,?,?);", [postId, userId, comment], (err, data) => {
            if (err) {
                console.log(err);
                return res.redirect("/");
            }
            res.redirect(`/post?id=${postId}`)
        })

    })
    ;


export default router;