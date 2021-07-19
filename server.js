const { notStrictEqual } = require('assert');
const { request, response } = require('express');
const express = require('express');
const path = require("path");
const app = express ()
const PORT = 8000
const taskArray = require('../oneServerjs/tasks.js')


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

app.post("/registro",(request, response)=>{
  console.log(request.body)
})


app.use((request, response)=>{
    let pathNotFound = path.join(__dirname, "Public", "404.html")
    response.status(404).sendFile(pathNotFound)

})

app.listen(PORT, ()=> { 
    console.log(`el servidor esta escuchando en el puerto : ${PORT}`)
})


