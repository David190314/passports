require("dotenv").config();
const passport = require('passport');
const {users} = require('../models')
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;


//Estrategia local
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    try{
        let results = await users.findOne({where: {email}});
        if(results && results.password === password){
            return done(null, results); 
        }
        return done(null, false,); 
    }catch(error){
        done(error);
    }
}));


//estrategia google 

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.SECRET_ID,
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqtoCallback: true
},(accessToken, refreshToken, profile, done)=>{
    return done(null,profile);
}));


//Estregia Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: "http://localhost:8000/auth/facebook/callback"
},(accessToken, refreshToken, profile, done)=>{
    return done(null,profile);
}))


passport.serializeUser((profile, done) => {
    return done(null, profile);
})

passport.deserializeUser(async(profile, done) => {
    try{
        switch(profile.provider){
            case"google":
                profile.firstname = profile.name.givenName
                profile.lastname = profile.name.familyName
                done(null, profile);
                break;
            case"facebook":
                console.log(profile)
                let cut = profile.displayName.indexOf(" ")
                profile.firstname = profile.displayName.slice(0,cut)
                profile.lastname = profile.displayName.slice(cut+1,profile.displayName.length)
                done(null, profile);
                break;
            default:
                let user = await users.findByPk(profile.id, {plain: true});
            done(null, user);
                break;
        } 

    }catch(error){
        done(error)
    }
});


