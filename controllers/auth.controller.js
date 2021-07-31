const passport = require('passport');
const {newUser} = require('../services/auth.services')

const renderLogin =  (req, res)=>{
    res.render("pages/login", {title : 'Iniciar Sesíon'});
}

const renderRegistro = async (req ,res) =>{
    res.render("pages/register" , {title:'Register'});
}

const register = async (req, res, next)=>{
    let {firstname, lastname, email, password} = req.body
    try{
        await newUser({firstname, lastname, email, password})
        res.redirect("/registro");
    }catch(error){
        next(error)
    }
}

const logout = (req, res) =>{
    req.logout();
    return res.redirect('/login')
}

const loginLocalAtuh = passport.authenticate('local',{
    successRedirect: '/categoria',
    failureRedirect: '/login'
})

const passportGoogleStrategy = passport.authenticate("google", 
    {session: true,
    scope: [ 'email', 'profile' ]
});

const passportFacebookStrategy = passport.authenticate("facebook",
    {session: true,
    scope: ['email', 'public_profile']
})

const gCallback = passport.authenticate( 'google', {
    successRedirect: '/categoria',
    failureRedirect: '/login'
})

const fCallback = passport.authenticate('facebook',{
    successRedirect: '/categoria',
    failureRedirect: '/login'
})



module.exports = {
    renderLogin,
    renderRegistro,
    register,
    logout, 
    loginLocalAtuh,
    passportGoogleStrategy,
    passportFacebookStrategy,
    gCallback,
    fCallback
}