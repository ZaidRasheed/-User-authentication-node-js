import express from 'express'
import bcrypt from "bcrypt";
const router = express.Router();
import passport from "passport";
import pool, { getUserByEmail } from "../db/pool.js"
import { isNotSignedIn } from "./middleWares.js"

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

router
    .get("", isNotSignedIn(), (req, res) => {
        res.render("register", { userfound: false, loggedIn: false });
    })
    .post("", isNotSignedIn(), async (req, res) => {
        let email = req.body.email;
        let salt = Math.floor(Math.random() * (6)) + 6;
        let hashedpassword = await bcrypt.hash(req.body.password, salt);
        let firstName = capitalizeFirstLetter(req.body.firstName);
        let lastName = capitalizeFirstLetter(req.body.lastName);
        try {
            let user = await getUserByEmail(email);
            res.render("register", { userfound: true, loggedIn: false });
        }
        catch (e) {
            pool.query('INSERT INTO users (first_name,last_name,email,password) VALUES (?,?,?,?);', [firstName, lastName, email, hashedpassword], (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ error: "server error" });
                }
                pool.query("SELECT last_insert_id() as user_id", (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    const user_id = data[0];
                    req.login(user_id, (err) => {
                        res.redirect("/");
                    });
                })
            });
        }
    })
passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});
passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});


export default router;