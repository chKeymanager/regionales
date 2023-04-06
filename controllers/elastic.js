const { Client } = require('@elastic/elasticsearch')

const elastic = (req,res) => {

const client = new Client({
          node: 'http://148.203.237.240:9200',
          auth: {
              username: 'elastic',
              password: 'YYQIQ5a3wFhicSowEk6H'
          }
      })

        //if (client){
        //    res.send({status: true, message:'Conexión exitosa'})
        //}else{
        //    res.send({status: false, message:'Conexión fallida'})
        //}

async function run () {

const { body } = await client.search({
    index: 'rep-fact',
    body: {
       "_source":["numero_asociado","ramo_industrial","clave_del_producto","estado","fecha_factura"],
       size: 10000,
    }
  })

  return body.hits.hits
  console.log(body.hits.hits)
  
}

run().catch(console.log)

}

const elasticsearchResults = await search();


module.exports = {elastic}
