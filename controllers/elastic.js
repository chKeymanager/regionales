const { Client } = require('@elastic/elasticsearch')

const elastic = (req,res) => {

const client = new Client({
          node: 'https://148.203.237.240:9200',
          auth: {
              username: 'elastic',
              password: 'YYQIQ5a3wFhicSowEk6H '
          },
          ssl: {
            ca: FileSystem.readFileSync('/etc/ssl/certs/ca.crt'),
            rejectUnauthorized: True
          }
      })

        //if (client){
        //    res.send({status: true, message:'Conexión exitosa'})
        //}else{
        //    res.send({status: false, message:'Conexión fallida'})
        //}

async function run () {

const { body } = await client.search({
    index: 'gs1-rep-fact-2023.04.01',
    body: {
       "_source":["numero_asociado","ramo_industrial","clave_del_producto","estado","fecha_factura"],
       size: 10000,
    }
  })

  console.log(body.hits.hits)

}

run().catch(console.log)

}



module.exports = {elastic}
