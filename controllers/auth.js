const conexion = require('../database/db')

const mysqls = (req,res) => {

conexion.query("SELECT * FROM rep_fact WHERE clave_del_producto = 'INS010001' AND fecha_factura > '2023-01-01 00:00:00'", (error, results, fields) => {
    if (error) {
      console.error('Error executing query: ' + error.stack);
      return;
    }
    //console.log('Query results:', results);
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


const mysqlr = (req,res) => {

  conexion.query("SELECT DISTINCT(numero_asociado),ramo_industrial,clave_del_producto, estado, fecha_factura, fecha_anualidad FROM rep_fact WHERE estado = 'Pagado' AND (clave_del_producto = 'CAS092023' OR clave_del_producto = 'CAS002023' OR clave_del_producto = 'CAS102023' OR clave_del_producto = 'CAS112023' OR clave_del_producto = 'CAS122023' OR clave_del_producto = 'CAS132023' OR clave_del_producto = 'CAS142023') AND fecha_factura > '2023-01-01 00:00:00'", (error, results, fields) => {
      if (error) {
        console.error('Error executing query: ' + error.stack);
        return;
      }
      //console.log('Query results:', results);
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

  const mysqlrc = (req,res) => {

    conexion.query("SELECT DISTINCT(numero_asociado),ramo_industrial,clave_del_producto, estado, fecha_factura, fecha_anualidad FROM rep_fact WHERE estado = 'Pagado' AND (CLAVE_DEL_PRODUCTO = 'CAS092022' OR CLAVE_DEL_PRODUCTO = 'CAS002022' OR CLAVE_DEL_PRODUCTO = 'CAS102022' OR CLAVE_DEL_PRODUCTO = 'CAS112022' OR CLAVE_DEL_PRODUCTO = 'CAS122022' OR CLAVE_DEL_PRODUCTO = 'CAS132022' OR CLAVE_DEL_PRODUCTO = 'CAS142022') AND fecha_factura > '2023-01-01 00:00:00'", (error, results, fields) => {
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

    const filtro = (req, res) => {
      const { 'start-date': startDate, 'end-date': endDate } = req.body;
      const query = 'SELECT DISTINCT(numero_asociado),ramo_industrial,clave_del_producto, estado, fecha_factura, fecha_anualidad FROM rep_fact WHERE fecha_factura BETWEEN ? AND ?';
      const [rows] = db.execute(query, [startDate, endDate]);
      res.render('results', { data: rows });
      console.log(results)
      }


    

  module.exports = {mysqls,mysqlr,mysqlrc,filtro}
