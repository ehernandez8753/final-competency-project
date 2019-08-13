require("dotenv").config({path: __dirname + "/../.env"});

const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
const userController = require("./controllers/userController.js");

const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

app.use(express.json());
app.listen(SERVER_PORT, () => console.log("Server Listening on Port", SERVER_PORT));

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}));

massive(CONNECTION_STRING).then(db => app.set("db", db));

//User Endpoints

app.get("/api/getUser", userController.getUser);
app.post("/api/login", userController.login);
app.post("/api/signup", userController.signup);
app.delete("/api/logout", userController.logout);
