const passport = require('passport');
const {users} = require('../models')
const LocalStrategy = require('passport-local').Strategy;

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

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async(id, done) => {
    try{
        let user = await users.findByPk(id, {raw: true});
        done(null, user); //request.user
    }catch(error){
        done(error)
    }
});
