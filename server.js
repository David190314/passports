const { notStrictEqual } = require('assert');
const { request, response } = require('express');
const express = require('express');
const path = require("path");
const app = express ()
const PORT = 8000



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
    let taskArray = [{
        "id": 1,
        "title": "Blue-faced booby",
        "description": "Occlusion of Pancreatic Duct, Percutaneous Approach"
      }, {
        "id": 2,
        "title": "Gazelle, thomson's",
        "description": "Revision of Drain Dev in R Toe Phalanx Jt, Extern Approach"
      }, {
        "id": 3,
        "title": "Partridge, coqui",
        "description": "Monitoring of Temperature, External Approach"
      }, {
        "id": 4,
        "title": "Rhinoceros, white",
        "description": "LDR Brachytherapy of Jejunum using Iridium 192"
      }, {
        "id": 5,
        "title": "Owl, white-browed",
        "description": "Plaque Radiation of Head and Neck"
      }, {
        "id": 6,
        "title": "Squirrel, indian giant",
        "description": "Extirpation of Matter from Ascending Colon, Perc Approach"
      }, {
        "id": 7,
        "title": "Gecko (unidentified)",
        "description": "Destruction of Sacrococcygeal Joint, Open Approach"
      }, {
        "id": 8,
        "title": "Tapir, brazilian",
        "description": "Revision of Autol Sub in Stomach, Extern Approach"
      }, {
        "id": 9,
        "title": "Heron, green",
        "description": "Supplement Right Neck Muscle with Autol Sub, Open Approach"
      }, {
        "id": 10,
        "title": "Springbok",
        "description": "Removal of Synthetic Substitute from L Carpal, Open Approach"
      }, {
        "id": 11,
        "title": "Beaver, european",
        "description": "Excision of Left Tarsal, Perc Endo Approach, Diagn"
      }, {
        "id": 12,
        "title": "Skunk, western spotted",
        "description": "Inspection of Left Acromioclavicular Joint, Extern Approach"
      }, {
        "id": 13,
        "title": "Red and blue macaw",
        "description": "Reposition Left Patella with Ext Fix, Perc Endo Approach"
      }, {
        "id": 14,
        "title": "Great white pelican",
        "description": "Drainage of Sacrum with Drainage Device, Perc Endo Approach"
      }, {
        "id": 15,
        "title": "Black-backed magpie",
        "description": "Transfer R Foot Subcu/Fascia with Skin, Subcu, Open Approach"
      }]
    response.render("pages/task", {title:"Tasks", message : "Lista de Tareas", items: taskArray})
})

app.use((request, response)=>{
    let pathNotFound = path.join(__dirname, "Public", "404.html")
    response.status(404).sendFile(pathNotFound)

})

app.listen(PORT, ()=> { 
    console.log(`el servidor esta escuchando en el puerto : ${PORT}`)
})


