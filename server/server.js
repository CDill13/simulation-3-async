require("dotenv").config();
const Auth0Strategy = require("passport-auth0");
const axios = require("axios");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const ctrlr = require("./controller");

const {
    SERVER_PORT,
    SESSION_SECRET,
    CONNECTION_STRING,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    LOGIN,
    CALLBACK_URL
} = process.env;

const app = express();
app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

//massive
massive(CONNECTION_STRING).then(
    db => {
        app.set("db", db)
        console.log(sChalk(`MASSIVE DEMON LISTENS`))
    }
);
//A1a1a1a1
//auth0

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: "openid profile"
}, function(accessToken, refreshToken, extraParams, profile, done) {
    // db calls
    const db = app.get("db");
    db.findMember([profile.id]).then( memberResult => {
        if (!memberResult[0]) {
            db.createId([
                // profile.displayName,
                profile.id
                // profile.picture
            ]).then( createdMember => {
                return done(null, createdMember[0].id)
            })
        } else {
            return done(null, memberResult[0].id)
        }
    })
    .catch( err => console.log("auth0Strat err: " + err));
}));
// serializeUser runs once on login
passport.serializeUser( (id, done) => {
    //puts profile info into session store
    done(null, id)
});
// runs before each endpoint is hit after login
passport.deserializeUser( (id, done) => {
    //putis info on req.user
    console.log(sChalk(`id?`, id));
    app.get("db").findSessionUser([id]).then( loggedInUser => {
        done(null, loggedInUser[0]);
    })
});

app.get("/auth", passport.authenticate("auth0"))
app.get("/auth/callback", passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/dashboard",
    failureRedirect: "http://localhost:3000/#/"
}));

app.get("/auth/me", function(req, res) {
    if(req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send("AH AH AH! YOU DIDN'T SAY THE MAGIC WORD!")
    }
});

app.get('/api/me', ( req, res, next) => {
    console.log(sChalk("finding session..."));
    if ( !req.user ) {
        console.log(chalk.red("YOU JUST LOST THE SESSION YOU LOSER!"))
    //   res.redirect('/');
    } else {
      // req.user === req.session.passport.user
      // console.log( req.user )
      // console.log( req.session.passport.user );
      res.status(200).send(req.user);
    }
});

// app.get("/auth/logout", (req, res) => {
//     console.log();
//     req.logOut();
//     // res.redirect("http://localhost:3002/#/");
// })

////////////////////////////////

app.delete(`/api/removeFriend/:user/:loser`, ctrlr.removeFriend);
app.post(`/api/addFriend`, ctrlr.addFriend);
app.put(`/api/updateProfile`, ctrlr.updateProfile);
// app.get(`/api/getAllMembers`, ctrlr.getAllMembers);
// app.post(`/api/getFriends`, ctrlr.getFriends)

//new endpoints

app.get(`/api/getUserFriends/:id`, ctrlr.getUserFriends);
app.get(`/api/getAllMembersFriendsExempt/:id`, ctrlr.getAllMembersFriendsExempt);
app.get(`/api/getFilteredMembersAndFriendships/:userid/:value/:attribute`, ctrlr.getFilteredMembersAndFriendships);
app.get(`/api/getSearchStuff/:userId/:searchBy/:searchValue`, ctrlr.getSearchStuff);

let port = SERVER_PORT;
let sChalk = chalk.blue;

app.listen(port, console.log(chalk.yellow(`SOMETHING SOMETHING PORT ${port}`)), console.log(sChalk(`NODE DEMON SPEAKS`)))