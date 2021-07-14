const { notStrictEqual } = require('assert');
const { request, response } = require('express');
const express = require('express');
const path = require("path");
const app = express () // app contiene las propiedades de express
const PORT = 8000

//Midedelwares metos para respomder a las peticiones del cliente
// Los Midedelwares trabajara en las peticiones  (GET, POST, PUT , DELETE)
//Middelwares incorporado (built-in) para respondes peteciones de estilos

let visitas = 1
let visit  = app.use((response, request , next)=>{
    function counter (){
        console.log(visitas ++)   
    }
   /*  if (visitas === 5){
       return next(new Error("El número de sesiones de tu dominio estan siendo ocupadas"));
    } */
    next()
    counter(visitas)
})

app.use(express.static(path.join(__dirname, "Public")));
app.use(express.urlencoded()); // permite recibir los datos enviados desde el cliente
app.use(express.json());// procesar datos atravez de formato json

app.get("/", (request, response)=>{
    let pathHome = path.join(__dirname, "Public", "index.html") // entregar la ruta del archivo
    response.sendFile(pathHome)
})
// metodo para redireccionar con express
app.get("/shop",(request,response)=>{ 
    response.redirect("/")
})


//metodo para recibir los datos del clie
app.post("/registro",(request, response)=>{
    const user = request.body;
    console.log(request.headers)
    console.log(user)
})




app.use((request, response)=>{
    let pathNotFound = path.join(__dirname, "Public", "404.html")
    response.status(404).sendFile(pathNotFound)

})

app.listen(PORT, ()=> { 
    console.log(`el servidor esta escuchando en el puerto : ${PORT}`)
})

