module.exports = {
    logPostLogin: (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).send('This is middleware, username or password is incorrect');
          }
          next();
        }
}