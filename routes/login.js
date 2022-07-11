import express from 'express'
import bcrypt from "bcrypt";
const router = express.Router()
import passport from "passport";
import { getUserByEmail } from "../db/pool.js"
import { isNotSignedIn } from "./middleWares.js"
router
    .get("", isNotSignedIn(), (req, res) => {
        res.render("login", { error: false, loggedIn: false, wrongPassword: false });
    })
    .post("/", isNotSignedIn(), async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        try {
            let user = await getUserByEmail(email);
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('server error');
                }
                if (!result) {
                    return res.render("login", { error: false, loggedIn: false, wrongPassword: true });
                }
                let user_id = {
                    user_id: user[0].id,
                }
                req.login(user_id, (err) => {
                    res.redirect("/");
                });
            })
        }
        catch (e) {
            res.render("login", { error: true, loggedIn: false, wrongPassword: false });
        }
    });
passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});
passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});


export default router;