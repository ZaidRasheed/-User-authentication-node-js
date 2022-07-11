import express from 'express'
const router = express.Router();

import { isSignedIn } from "./middleWares.js"

router
    .get("", isSignedIn(), (req, res) => {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });

export default router;