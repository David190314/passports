require("dotenv").config();
const passport = require('passport');
const {users} = require('../models')
const LocalStrategy = require('passport-local').Strategy;
GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;



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
},(request, accessToken, refreshToken, profile, done)=>{
    return done(null,profile);
}));

passport.serializeUser((profile, done) => {
    return done(null, profile);
})

passport.deserializeUser(async(profile, done) => {
    try{
        if(profile.id.toString().length <=10){
            let user = await users.findByPk(profile.id, {plain: true});
            done(null, user); //request.user
        }else{
            profile.firstname = profile.name.givenName
            profile.lastname = profile.name.familyName
            done(null, profile);
        }
    }catch(error){
        done(error)
    }
});


