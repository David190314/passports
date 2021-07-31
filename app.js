const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const authRouter = require('./routes/auth.routes')
const catRouter = require('./routes/category.routes')
const sessionConf = require('./utils/session.conf')
const app = express ()  
require("./config/passport")

// const SequelizeStore = require("connect-session-sequelize")(session.Store);
// let {sequelize} = require("./models");


// app.use(session({
//   secret: "academlo secret",
//   resave: false,
//   saveUninitialized: false,
//   store: new SequelizeStore({
//     expiration: 1 * 60 * 60 * 1000,
//     db: sequelize
//   })
// }));
app.use(sessionConf);
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname + '/Css'))
app.use(express.urlencoded({extended: true})); // permite recibir los datos enviados desde el cliente
app.use(express.json());// procesar datos atravez de formato json

//Configuracion de Ejs
app.set('views', path.join(__dirname, 'views'));
//Definir el motor de plantilas
app.set('view engine', 'ejs')

app.get('/', (req, res, next)=>{
    res.render("pages/home", {title:"Categories"})
})

app.use(authRouter);
app.use(catRouter);


app.use((request, response)=>{
    let pathNotFound = path.join(__dirname, "Public", "404.html")
    response.status(404).render(pathNotFound)

})


app.use((error, request, response, next)=>{
  const errors = require("./utils/errorMessages")
  response.status(404).send(errors[error.name])
})

module.exports = app;