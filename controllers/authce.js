const conexion = require('../database/db')

const mysqlcei = (req,res) => {

conexion.query("SELECT DISTINCT(numero_asociado),ramo_industrial,clave_del_producto, estado, fecha_factura, fecha_anualidad FROM rep_fact WHERE clave_del_producto = 'INSCAT023' AND fecha_factura > '2023-01-01 00:00:00'", (error, results, fields) => {
    if (error) {
      console.error('Error executing query: ' + error.stack);
      return;
    }
    // console.log('Query results:', results);
    const ds = []
    for (const i in results){
      ds.push([
        results[i].numero_asociado,
        results[i].ramo_industrial,
        results[i].clave_del_producto,
        results[i].estado,
        results[i].fecha_factura,
        results[i].fecha_anualidad
      ])
    }
    res.send(ds)
    console.log(ds.length)
  });
}


const mysqlcer = (req,res) => {

  conexion.query("SELECT DISTINCT(numero_asociado),ramo_industrial,clave_del_producto, estado, fecha_factura FROM rep_fact WHERE estado = 'Pagado' AND (clave_del_producto = 'CAT002023' OR clave_del_producto = 'CAT012023') AND fecha_factura > '2023-01-01 00:00:00'", (error, results, fields) => {
      if (error) {
        console.error('Error executing query: ' + error.stack);
        return;
      }
      // console.log('Query results:', results);
      const ds = []
      for (const i in results){
        ds.push([
          results[i].numero_asociado,
          results[i].ramo_industrial,
          results[i].clave_del_producto,
          results[i].estado,
          results[i].fecha_factura,
          results[i].fecha_anualidad
        ])
      }
      res.send(ds)
      console.log(ds.length)
    });
  
  }

  const mysqlcerc = (req,res) => {

    conexion.query("SELECT DISTINCT(numero_asociado),ramo_industrial,clave_del_producto, estado, fecha_factura FROM rep_fact WHERE estado = 'Pagado' AND (clave_del_producto = 'CAT002016' OR clave_del_producto = 'CAT002017' OR clave_del_producto = 'CAT002018' OR clave_del_producto = 'CAT002019' OR clave_del_producto = 'CAT002020' OR clave_del_producto = 'CAT002021' OR clave_del_producto = 'CAT002022' OR clave_del_producto = 'CAT012021') AND fecha_factura > '2023-01-01 00:00:00'", (error, results, fields) => {
        if (error) {
          console.error('Error executing query: ' + error.stack);
          return;
        }
        // console.log('Query results:', results);
        const ds = []
        for (const i in results){
          ds.push([
            results[i].numero_asociado,
            results[i].ramo_industrial,
            results[i].clave_del_producto,
            results[i].estado,
            results[i].fecha_factura,
            results[i].fecha_anualidad
          ])
        }
        res.send(ds)
        console.log(ds.length)
      });
    
    }

    

  module.exports = {mysqlcei,mysqlcer,mysqlcerc}
