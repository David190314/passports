require('dotenv').config()
const app = require('./app')
const PORT = process.env.PORT
app.listen(PORT, ()=> { 
    console.log(`el servidor esta escuchando en el puerto : ${PORT}`)
})


