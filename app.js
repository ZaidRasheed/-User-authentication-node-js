import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import expressSession from "express-session"
import passport from "passport";
import cookieParser from 'cookie-parser'


const port=process.env.PORT || 3000;


env.config();



const app = express();



app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.static("public"));


import home from "./routes/home.js"
import login from "./routes/login.js"
import register from "./routes/register.js"
import profile from "./routes/profile.js"
import logout from "./routes/logout.js"
import submit from "./routes/submit.js"
import deletes from "./routes/delete.js"
import post from "./routes/viewpost.js"
import edit from "./routes/edit.js"

app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    // store:sessionStore,
    saveUninitialized: false,
    // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());







app.use("/", home);

app.use("/login", login);

app.use("/register", register);

app.use("/profile", profile);

app.use("/logout", logout);

app.use("/submit", submit);

app.use("/delete", deletes);

app.use("/post", post);

app.use("/edit", edit);

app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    res.status(403)
    res.send('form tampered with')
})


app.use((req, res) => {
    res.status(404).render("404", { loggedIn: req.isAuthenticated() });
})

app.listen(port, () => {

});
