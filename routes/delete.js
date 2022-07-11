import express from 'express'
import pool from "../db/pool.js"
import { isSignedIn, isAdmin, isRightUser } from "./middleWares.js"
const router = express.Router();


router
    .post("/post", isSignedIn(), isAdmin(), (req, res) => {
        let postId = req.body.postId;
        pool.query("DELETE FROM comments WHERE post_id=?", [postId], (err1, data) => {
            if (err1) {
                console.log(err1);
                return res.status(500).send({ error: "server error" });
            }
            pool.query("DELETE FROM posts WHERE id=?;", [postId], (err2, data) => {
                if (err2) {
                    console.log(err2);
                    return res.status(500).send({ error: "server error" });
                }
                res.redirect("/");
            })
        })
    })
    .post("/comment", isSignedIn(), isRightUser(), (req, res) => {
        pool.query("DELETE FROM comments WHERE id=?;", [req.body.commentId], (err, data) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500).render(`/${req.body.source}`);
            }
            res.redirect(`/${req.body.source}`);
        })
    })
    ;
export default router;