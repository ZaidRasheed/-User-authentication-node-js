function isNotSignedIn() {
    return (req, res, next) => {
        if (!req.isAuthenticated()) return next();
        res.redirect('/profile')
    }
}
function isSignedIn() {
    return (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('/login')
    }
}
function isAdmin() {
    return (req, res, next) => {
        if (req.user.user_id.toString() === process.env.ADMIN) return next();
        res.redirect('/')
    }
}
function isRightUser() {
    return (req, res, next) => {
        if (req.body.userId == req.user.user_id || req.body.userId.toString() === process.env.ADMIN) return next();
        res.send({ error: "not allowed" });
    }
}

export { isSignedIn, isNotSignedIn, isAdmin, isRightUser }