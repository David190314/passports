const { notStrictEqual } = require('assert');
const { request, response } = require('express');
const express = require('express');
const path = require("path");
const taskArray = require('../oneServerjs/tasks.js')
const {users} = require("./models");
const app = express ()
const PORT = 9000

app.use(express.urlencoded()); // permite recibir los datos enviados desde el cliente
app.use(express.json());// procesar datos atravez de formato json

//Configuracion de Ejs
app.set('views', path.join(__dirname, 'views'));
//Definir el motor de plantilas
app.set('view engine', 'ejs')

let visitas = 0
app.get("/", (request, response)=>{
        console.log(visitas ++)
  response.render("pages/home", {title:"inicio", message : "Hola mundo con EJS", asistencia: visitas})
})

app.get("/tareas", (request, response)=>{
    response.render("pages/task", {title:"Tasks",
      message : "Lista de Tareas",
      items: taskArray})
})

app.get("/registro",(request, response)=>{
    response.render("pages/register");
})

app.post("/registro", async (request, response)=>{
  let {firstname, lastname, email, password} = request.body;
  let response = await users.create({
     firstnam,
     lastname,
     email,
     password
   })
  response.redirect("/registro")
})


app.use((request, response)=>{
    let pathNotFound = path.join(__dirname, "Public", "404.html")
    response.status(404).sendFile(pathNotFound)

})

app.listen(PORT, ()=> { 
    console.log(`el servidor esta escuchando en el puerto : ${PORT}`)
})


