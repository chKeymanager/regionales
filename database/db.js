const mysql = require('mysql2')

const conexion = mysql.createConnection({
    host : 'localhost',
    user : 'dev',
    password : 'Postech2021!',
    database : 'regionales',
})

conexion.connect( (error)=> {
    if(error){
        console.log('El error de conexión es: '+error)
        return
    }
    console.log('¡Conectado a la base de datos MySQL!')
})

module.exports = conexion
