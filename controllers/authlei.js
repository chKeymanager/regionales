const conexion = require('../database/db')

const mysqlleii = (req,res) => {

conexion.query("SELECT * FROM rep_fact WHERE clave_del_producto = 'INSLEI001' AND fecha_factura > '2023-01-01 00:00:00'", (error, results, fields) => {
    if (error) {
      console.error('Error executing query: ' + error.stack);
      return;
    }
    console.log('Query results:', results);
    const ds = []
    for (const i in results){
      ds.push([
        results[i].numero_asociado,
        results[i].ramo_industrial,
        results[i].clave_del_producto,
        results[i].estado,
        results[i].fecha_factura
      ])
    }
    res.send(ds)
    console.log(ds.length)
  });

}


const mysqlleir = (req,res) => {

  conexion.query("SELECT * FROM rep_fact WHERE estado = 'Pagado' AND (clave_del_producto = 'CLEI02023') AND fecha_factura > '2023-01-01 00:00:00'", (error, results, fields) => {
      if (error) {
        console.error('Error executing query: ' + error.stack);
        return;
      }
      console.log('Query results:', results);
      const ds = []
      for (const i in results){
        ds.push([
          results[i].numero_asociado,
          results[i].ramo_industrial,
          results[i].clave_del_producto,
          results[i].estado,
          results[i].fecha_factura
        ])
      }
      res.send(ds)
      console.log(ds.length)
    });
  
  }

  module.exports = {mysqlleii,mysqlleir}
