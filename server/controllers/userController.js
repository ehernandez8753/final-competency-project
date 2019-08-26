const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    login: async function(req, res, next){
        let {username, password} = req.body;
        const db = req.app.get("db");
        //Check if user exists
        let [existingUser] = await db.get_user_by_username(username);
        //If user does not exist
        if(!existingUser) return res.status(401).send("Username not found");
        let resultPassword = await bcrypt.compare(password, existingUser.password);
        delete existingUser.password;
        //console.log(existingUser);
        //Check if Password is correct
        if(resultPassword){
            req.session.user = {
                username: existingUser.username,
                loggedIn: true
            }
            res.send(req.session.user);
            
        }else{
            next();
            //res.status(401).send("Username or Password is Incorrect");
        }
    },
    signup: async function(req, res){
        let {username, password} = req.body;
        const db = req.app.get("db");
        //Check if username does not exist
        let [existingUser] = await db.get_user_by_username(username);
        //If username does exist
        if(existingUser) return res.status(400).send("Username already taken");

        //Encrypt Password
        let salt = await bcrypt.genSalt(saltRounds);
        let hashPassword = await bcrypt.hash(password, salt);
        let [ user ] = await db.create_user( [ username, hashPassword]);
        req.session.user = {
            username: user.username,
            loggedIn: true
        }

        res.send(req.session.user);
        
    },
    logout: async function(req, res){
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: async function(req, res){
        if(req.session.user){
            if(req.session.user.loggedIn){
                res.status(200).send(req.session.user);
            }else{
                res.status(401).send("Unauthorised access, please log in to continue");
            }
        }
    }
}