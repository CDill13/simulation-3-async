require("dotenv").config();
const Auth0Strategy = require("passport-auth0");
const axios = require("axios");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");

const app = express();
app.use(bodyParser.json());

const {
    SERVER_PORT,
    SESSION_SECRET
} = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

//massive

//auth0

let port = SERVER_PORT;
let sChalk = chalk.blue;
app.listen(console.log(chalk.green(`SOMETHING SOMETHING PORT${port}`)), console.log(sChalk(`NODE DEMON SPEAKS`)))