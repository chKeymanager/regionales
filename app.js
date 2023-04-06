require('dotenv').config();
const express = require('express');
const routes = require('./routes/router')
const app = express();  

app.use(express.static('public'));  
app.set('view engine' , 'ejs');

app.use('/', routes)

const PORT = process.env.PORT || 5050

app.listen(PORT, () => {
    console.log(`Aplicacion corriendo en el puerto: ${PORT}`)
})
