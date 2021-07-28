const express = require('express');
const path = require("path");
const taskArray = require('../oneServerjs/tasks.js')
const {users} = require("./models");
const passport = require("passport")
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
let {sequelize} = require("./models");
const app = express ()  
require("./config/passport")
const PORT = 8000

app.use(session({
  secret: "academlo secret",
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    expiration: 1 * 60 * 60 * 1000,
    db: sequelize
  })
}));

const passportGoogleStrategy = passport.authenticate("google", {session: true, scope: [ 'email', 'profile' ]});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/Css'))
app.use(express.urlencoded({extended: true})); // permite recibir los datos enviados desde el cliente
app.use(express.json());// procesar datos atravez de formato json

//Configuracion de Ejs
app.set('views', path.join(__dirname, 'views'));
//Definir el motor de plantilas
app.set('view engine', 'ejs')



let visitas = 0
app.get("/", (request, response)=>{
  visitas++
  response.render("pages/home", {title:"inicio", asistencia: visitas})
})

app.get("/tareas", (request, response)=>{
    response.render("pages/task", {title:"Tasks",
    message : "Lista de Tareas",
    items: taskArray
    })
})


app.get("/registro", async(request, response)=>{
    response.render("pages/register" , {title:'Register'});
})


app.post("/registro", async (request, response, next)=>{
  let {firstname, lastname, email, password} = request.body;
  try{
    let result = await users.create({
      firstname,
      lastname,
      email,
      password
    })
   response.redirect("/registro");
  }catch(error){
    next(error)
  }
})

app.get("/login",(require, response, next)=>{
  response.render("pages/login", {title : 'Iniciar Sesíon'});
})

app.get('/auth/google', passportGoogleStrategy);

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/categoria',
        failureRedirect: '/login'
}));

app.post("/login",passport.authenticate("local",{
  successRedirect: '/categoria',
  failureRedirect: '/login'
}),(error, request, response, next)=>{
  if(error) return next(error)
})

app.get("/categoria", (req, res) => {
    if(req.isAuthenticated()){
      let fullname = `${req.user.firstname} ${req.user.lastname}`;
      res.render("pages/categories", {title:"Categories", username :fullname});
    }   
    return res.redirect("/login");  
   
})


app.get("/logout", (request, response) => {
  request.logout();
  response.redirect("/login");
});

app.get("/categorias/editar/:id", (request, response) => {
  response.render("pages/edit-category", {title: 'Categorías'});
});


app.use((request, response)=>{
    let pathNotFound = path.join(__dirname, "Public", "404.html")
    response.status(404).render(pathNotFound)

})

// Manejo de errores a las peteciones y respuestas

app.use((error, request, response, next)=>{
  const errors = require("./utils/errorMessages")
  response.status(404).send(errors[error.name])
})

app.listen(PORT, ()=> { 
    console.log(`el servidor esta escuchando en el puerto : ${PORT}`)
})


